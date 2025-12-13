using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Application.DTOs.Auth;
using Nafeza.Application.Features.Auth.Commands;

namespace Nafeza.API.Controllers
{
    public class AuthController : ApiControllerBase
    {
        private readonly IApplicationDbContext _context;

        public AuthController(IApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginCommand command)
        {
            // We just pass the command to the "Brain" (Application Layer)
            // The Controller doesn't know about Databases or JWTs.
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        // Add this inside AuthController class

        [HttpPost("register")]
        public async Task<ActionResult<int>> Register([FromBody] RegisterCommand command)
        {
            // 1. Send data to the handler we just wrote
            var userId = await Mediator.Send(command);

            // 2. Return success
            return Ok(new { UserId = userId, Message = "Registration Successful" });
        }

        // Token Login Endpoint
        [HttpPost("token-login")]
        public async Task<ActionResult<LoginResponseDto>> TokenLogin([FromBody] TokenLoginCommand command)
        {
            var result = await Mediator.Send(command);
            return Ok(result);
        }

        // Endpoint to check if the USB e-Token is connected (Mock)
        [HttpGet("check-etoken")]
        public IActionResult CheckEToken()
        {
            // For the interview demo, we always say "Connected"
            return Ok(new { Status = "Connected", SerialNumber = "USB-TOKEN-998877" });
        }

        // Get current user profile
        [HttpGet("profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out int userId))
                return Unauthorized("Invalid user token");

            var user = await _context.Parties.FindAsync(userId);
            if (user == null)
                return NotFound("User not found");

            return Ok(new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                TaxId = user.TaxId,
                CargoXId = user.CargoXId,
                Type = user.Type.ToString()
            });
        }
    }
}