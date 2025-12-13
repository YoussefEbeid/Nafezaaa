using MediatR;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Nafeza.Application.Features.ACI.Commands
{
    // 1. The Command: Defines what data is needed to create a request
    public class CreateAciCommand : IRequest<int>
    {
        public int ImporterId { get; set; }
        public int ExporterId { get; set; }
        public int CurrentUserId { get; set; } // ID of the authenticated user creating the request
    }

    // 2. The Handler: The logic that executes when the command is sent
    public class CreateAciCommandHandler : IRequestHandler<CreateAciCommand, int>
    {
        private readonly IApplicationDbContext _context;
        private readonly ICargoXService _cargoX;

        public CreateAciCommandHandler(IApplicationDbContext context, ICargoXService cargoX)
        {
            _context = context;
            _cargoX = cargoX;
        }

        public async Task<int> Handle(CreateAciCommand request, CancellationToken cancellationToken)
        {
            // Business Rule: Validate Exporter on Blockchain first
            // BUT: Skip validation if the exporter is the current user (they're already authenticated)
            var exporter = await _context.Parties.FindAsync(new object[] { request.ExporterId }, cancellationToken);

            if (exporter != null && !string.IsNullOrEmpty(exporter.CargoXId))
            {
                // Only validate if the exporter is NOT the current user
                // If the current user is the exporter, they're already authenticated and in the DB
                if (request.ExporterId != request.CurrentUserId)
                {
                    bool isValid = await _cargoX.ValidateExporterIdAsync(exporter.CargoXId);
                    if (!isValid)
                    {
                        // In a real app, throw a specific Domain Exception here
                        throw new Exception("Foreign Exporter is not verified on CargoX Blockchain.");
                    }
                }
            }

            // Create Entity
            var entity = new AcidRequest(request.ImporterId, request.ExporterId);

            // Add to DB
            _context.AcidRequests.Add(entity);
            await _context.SaveChangesAsync(cancellationToken);

            // Return the new ID (e.g., 105)
            return entity.Id;
        }
    }
}