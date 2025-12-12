using MediatR;
using Microsoft.EntityFrameworkCore;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Application.DTOs;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Nafeza.Application.Features.ACI.Queries
{
    // Request: Give me the status for ID X
    public class GetAciStatusQuery : IRequest<AcidRequestDto>
    {
        public int RequestId { get; set; }
    }

    public class GetAciStatusQueryHandler : IRequestHandler<GetAciStatusQuery, AcidRequestDto>
    {
        private readonly IApplicationDbContext _context;

        public GetAciStatusQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AcidRequestDto?> Handle(GetAciStatusQuery request, CancellationToken cancellationToken)
        {
            var entity = await _context.AcidRequests
                .Include(x => x.Importer)
                .Include(x => x.Exporter)
                .Include(x => x.Items) // Eager Load items
                .FirstOrDefaultAsync(x => x.Id == request.RequestId, cancellationToken);

            if (entity == null) return null; // Or throw NotFoundException

            // Map Entity -> DTO manually (or use AutoMapper)
            return new AcidRequestDto
            {
                Id = entity.Id,
                AcidNumber = entity.AcidNumber ?? "Pending Issuance",
                ImporterName = entity.Importer.Name,
                ExporterName = entity.Exporter.Name,
                Status = entity.Status.ToString(),
                RequestDate = entity.CreatedAt,
                ItemCount = entity.Items.Count,
                Items = entity.Items.Select(i => new DTOs.InvoiceItemDto
                {
                    Id = i.Id,
                    HSCode = i.HSCode,
                    Description = i.Description,
                    Quantity = i.Quantity,
                    Price = i.UnitPrice,
                    Weight = i.NetWeight,
                    TotalValue = i.TotalValue
                }).ToList()
            };
        }
    }
}