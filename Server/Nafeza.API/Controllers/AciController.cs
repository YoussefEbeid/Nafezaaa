using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // <--- FIXES THE .Include() ERROR
using Nafeza.Application.DTOs;
using Nafeza.Application.Features.ACI.Commands;
using Nafeza.Application.Features.ACI.Queries;
using Nafeza.Domain.Exceptions;
using Nafeza.Infrastructure.Persistence;
using OfficeOpenXml; // <--- RESTORES EXCEL LOGIC
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AciController : ApiControllerBase
    {
        private readonly AppDbContext _context;

        public AciController(AppDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. Create Draft
        // ==========================================
        [HttpPost("draft")]
        [Authorize]
        public async Task<ActionResult<int>> CreateDraft([FromBody] CreateAciCommand command)
        {
            // Get current user ID from JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized(new { message = "Invalid user token" });

            // Get current user to determine their type
            var currentUser = await _context.Parties.FindAsync(userId);
            if (currentUser == null)
                return Unauthorized(new { message = "User not found" });

            // Set the appropriate ID based on user type
            // If user is an Exporter, they are creating a request where they are the exporter
            // If user is an Importer, they are creating a request where they are the importer
            if (currentUser.Type == Domain.Enums.PartyType.ForeignExporter)
            {
                // User is an Exporter, so set ExporterId to their ID
                command.ExporterId = userId;
                // ImporterId should come from the command (the foreign importer they selected)
            }
            else if (currentUser.Type == Domain.Enums.PartyType.Importer)
            {
                // User is an Importer, so set ImporterId to their ID
                command.ImporterId = userId;
                // ExporterId should come from the command (the foreign exporter they selected)
            }
            else
            {
                return BadRequest(new { message = "Only Importers and Exporters can create ACI requests" });
            }

            // Pass the current user ID to the handler so it can skip validation for the current user
            command.CurrentUserId = userId;

            var requestId = await Mediator.Send(command);
            return Ok(new { RequestId = requestId, Message = "Draft created successfully." });
        }

        // ==========================================
        // 2. Get Status
        // ==========================================
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AcidRequestDto>> GetStatus(int id)
        {
            var query = new GetAciStatusQuery { RequestId = id };
            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound(new { Message = "ACID Request not found." });

            return Ok(result);
        }

        // ==========================================
        // 3. Upload Invoice (REAL EXCEL LOGIC RESTORED)
        // ==========================================
        [HttpPost("{id}/upload-invoice")]
        [AllowAnonymous]
        [RequestFormLimits(MultipartBodyLengthLimit = 10485760)] // 10MB limit
        public async Task<IActionResult> UploadInvoice(int id, [FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // 1. Get Shipment
            var shipment = await _context.AcidRequests
                .Include(a => a.Items) // This works now because of Microsoft.EntityFrameworkCore
                .FirstOrDefaultAsync(a => a.Id == id);

            if (shipment == null) return NotFound("ACID Request not found");

            // 2. Read Excel
            ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            try
            {
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    using (var package = new ExcelPackage(stream))
                    {
                        var worksheet = package.Workbook.Worksheets[0];
                        var rowCount = worksheet.Dimension?.Rows ?? 0;

                        if (rowCount < 2)
                            return BadRequest("Excel file must have at least a header row and one data row.");

                        var processedCount = 0;
                        var errorMessages = new List<string>();

                        // Start at row 2 to skip header
                        for (int row = 2; row <= rowCount; row++)
                        {
                            var hsCode = worksheet.Cells[row, 1].Value?.ToString()?.Trim();
                            var desc = worksheet.Cells[row, 2].Value?.ToString()?.Trim() ?? string.Empty;
                            var qtyText = worksheet.Cells[row, 3].Value?.ToString()?.Trim();
                            var priceText = worksheet.Cells[row, 4].Value?.ToString()?.Trim();
                            var weightText = worksheet.Cells[row, 5].Value?.ToString()?.Trim() ?? "0";

                            // Skip empty rows
                            if (string.IsNullOrWhiteSpace(hsCode) && string.IsNullOrWhiteSpace(qtyText))
                                continue;

                            // Validate HS Code format
                            if (string.IsNullOrWhiteSpace(hsCode))
                            {
                                errorMessages.Add($"Row {row}: HS Code is required.");
                                continue;
                            }

                            if (hsCode.Length < 4)
                            {
                                errorMessages.Add($"Row {row}: HS Code '{hsCode}' must be at least 4 digits. Found: '{hsCode}' (length: {hsCode.Length}).");
                                continue;
                            }

                            // Validate Quantity
                            if (string.IsNullOrWhiteSpace(qtyText))
                            {
                                errorMessages.Add($"Row {row}: Quantity is required.");
                                continue;
                            }

                            if (!decimal.TryParse(qtyText, out decimal qty) || qty <= 0)
                            {
                                errorMessages.Add($"Row {row}: Quantity must be a positive number. Found: '{qtyText}'.");
                                continue;
                            }

                            // Parse optional fields
                            if (!decimal.TryParse(priceText, out decimal price))
                                price = 0;

                            if (!decimal.TryParse(weightText, out decimal weight))
                                weight = 0;

                            try
                            {
                                shipment.AddItem(hsCode, desc, qty, price, weight);
                                processedCount++;
                            }
                            catch (Exception ex)
                            {
                                errorMessages.Add($"Row {row}: {ex.Message}");
                            }
                        }

                        if (processedCount == 0)
                        {
                            var errorMsg = errorMessages.Any() 
                                ? string.Join(" ", errorMessages.Take(5)) + (errorMessages.Count > 5 ? $" ... and {errorMessages.Count - 5} more errors." : "")
                                : "No valid rows found. Expected format: Column 1 = HS Code (4+ digits), Column 2 = Description, Column 3 = Quantity, Column 4 = Price, Column 5 = Weight (optional).";
                            return BadRequest($"Error parsing Excel file: {errorMsg}");
                        }

                        if (errorMessages.Any())
                        {
                            // Some rows processed, but some had errors
                            var warning = string.Join(" ", errorMessages.Take(3)) + (errorMessages.Count > 3 ? $" ... and {errorMessages.Count - 3} more errors." : "");
                            // Continue but log warnings
                        }
                    }
                }

                await _context.SaveChangesAsync();

                // 3. Return Real Totals
                var result = new
                {
                    Message = "Invoice Processed Successfully",
                    TotalLines = shipment.Items.Count,
                    TotalValueUSD = shipment.Items.Sum(i => i.TotalValue),
                    Items = shipment.Items.Select(i => new
                    {
                        HSCode = i.HSCode,
                        Description = i.Description,
                        Quantity = i.Quantity,
                        Value = i.TotalValue
                    })
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error parsing Excel file: {ex.Message}");
            }
        }

        // ==========================================
        // 4. Submit ACI Request
        // ==========================================
        [HttpPost("{id}/submit")]
        [Authorize]
        public async Task<IActionResult> SubmitAci(int id)
        {
            try
            {
                // Get current user ID from JWT
                var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
                if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                    return Unauthorized(new { message = "Invalid user token" });

                var shipment = await _context.AcidRequests
                    .Include(a => a.Items)
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (shipment == null)
                    return NotFound(new { message = "ACID Request not found" });

                // Verify the request belongs to the current user (either as importer or exporter)
                if (shipment.ImporterId != userId && shipment.ExporterId != userId)
                    return BadRequest(new { message = "You can only submit your own requests" });

                // Check if shipment has items
                var itemCount = shipment.Items?.Count ?? 0;
                if (itemCount == 0)
                {
                    return BadRequest(new { message = "Cannot submit an empty shipment. Please upload invoice items first." });
                }

                // Check if already submitted
                if (shipment.Status != Domain.Enums.ShipmentStatus.Draft)
                {
                    return BadRequest(new { message = $"Request is already {shipment.Status}. Cannot submit again." });
                }

                // Submit the request
                shipment.Submit();
                await _context.SaveChangesAsync();

                // Generate ACID number (simplified - in real app this would be more complex)
                // Format: YYYY-EG-XXXXXXXXXXXX (19 digits total)
                var acidNumber = $"{DateTime.UtcNow.Year}-EG-{shipment.Id:D12}";
                
                // Approve immediately (in real app, this would be done by an admin after review)
                shipment.Approve(acidNumber);
                await _context.SaveChangesAsync();

                return Ok(new { 
                    Message = "Request submitted successfully", 
                    AcidNumber = acidNumber,
                    Status = shipment.Status.ToString()
                });
            }
            catch (NafezaDomainException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Log the full exception for debugging
                Console.WriteLine($"Submit error: {ex}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = $"An internal server error occurred: {ex.Message}" });
            }
        }

        // ==========================================
        // 5. Get All ACI Requests for Current User
        // ==========================================
        [HttpGet("list")]
        [Authorize]
        public async Task<ActionResult<List<AcidRequestDto>>> GetMyAciRequests()
        {
            // Get current user ID from JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid user token");

            // Get requests where user is either the importer OR the exporter
            var requests = await _context.AcidRequests
                .Include(x => x.Importer)
                .Include(x => x.Exporter)
                .Include(x => x.Items)
                .Where(x => x.ImporterId == userId || x.ExporterId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new AcidRequestDto
                {
                    Id = x.Id,
                    AcidNumber = x.AcidNumber ?? "---",
                    ImporterName = x.Importer.Name,
                    ExporterName = x.Exporter.Name,
                    Status = x.Status.ToString(),
                    RequestDate = x.CreatedAt,
                    ItemCount = x.Items.Count
                })
                .ToListAsync();

            return Ok(requests);
        }

        // ==========================================
        // 6. Search Exporters
        // ==========================================
        [HttpGet("exporters/search")]
        [Authorize]
        public async Task<ActionResult<List<object>>> SearchExporters([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                // Return all exporters if no query
                var allExporters = await _context.Parties
                    .Where(p => p.Type == Domain.Enums.PartyType.ForeignExporter)
                    .Select(p => new
                    {
                        Id = p.Id,
                        Name = p.Name,
                        CargoXId = p.CargoXId,
                        Email = p.Email
                    })
                    .Take(20)
                    .ToListAsync();

                return Ok(allExporters);
            }

            // Search by CargoX ID or Name (case-insensitive using EF.Functions.Like)
            var searchPattern = $"%{query}%";
            var exporters = await _context.Parties
                .Where(p => p.Type == Domain.Enums.PartyType.ForeignExporter &&
                           ((p.CargoXId != null && EF.Functions.Like(p.CargoXId, searchPattern)) ||
                            (p.Name != null && EF.Functions.Like(p.Name, searchPattern))))
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    CargoXId = p.CargoXId,
                    Email = p.Email
                })
                .Take(10)
                .ToListAsync();

            return Ok(exporters);
        }

        // ==========================================
        // 6b. Search Importers
        // ==========================================
        [HttpGet("importers/search")]
        [Authorize]
        public async Task<ActionResult<List<object>>> SearchImporters([FromQuery] string? query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                // Return all importers if no query
                var allImporters = await _context.Parties
                    .Where(p => p.Type == Domain.Enums.PartyType.Importer)
                    .Select(p => new
                    {
                        Id = p.Id,
                        Name = p.Name,
                        TaxId = p.TaxId,
                        Email = p.Email
                    })
                    .Take(20)
                    .ToListAsync();

                return Ok(allImporters);
            }

            // Search by Tax ID or Name (case-insensitive using EF.Functions.Like)
            var searchPattern = $"%{query}%";
            var importers = await _context.Parties
                .Where(p => p.Type == Domain.Enums.PartyType.Importer &&
                           ((p.TaxId != null && EF.Functions.Like(p.TaxId, searchPattern)) ||
                            (p.Name != null && EF.Functions.Like(p.Name, searchPattern))))
                .Select(p => new
                {
                    Id = p.Id,
                    Name = p.Name,
                    TaxId = p.TaxId,
                    Email = p.Email
                })
                .Take(10)
                .ToListAsync();

            return Ok(importers);
        }

        // ==========================================
        // 7. Validate ACID (Public Service)
        // ==========================================
        [HttpPost("validate")]
        [AllowAnonymous]
        public async Task<IActionResult> ValidateAci([FromBody] ValidateAciDto request)
        {
            var shipment = await _context.AcidRequests
                .Include(a => a.Importer)
                .Include(a => a.Exporter)
                .FirstOrDefaultAsync(a => a.AcidNumber == request.AcidNumber);

            if (shipment == null)
            {
                return BadRequest(new { Valid = false, Message = "ACID Number does not exist." });
            }

            if (shipment.Importer.TaxId != request.ImporterTaxId)
            {
                return BadRequest(new { Valid = false, Message = "Invalid Importer Tax ID for this shipment." });
            }

            return Ok(new
            {
                Valid = true,
                Message = "Shipment Data is Correct and Active.",
                Details = new
                {
                    Importer = shipment.Importer.Name,
                    Exporter = shipment.Exporter.Name,
                    Status = shipment.Status.ToString(),
                }
            });
        }
    }
}