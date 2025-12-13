using Microsoft.EntityFrameworkCore;
using Nafeza.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Nafeza.Application.Common.Interfaces
{
    // This allows us to access the database from the Logic layer
    // without depending on the specific SQL implementation.
    public interface IApplicationDbContext
    {
        DbSet<Party> Parties { get; }
        DbSet<AcidRequest> AcidRequests { get; }
        DbSet<InvoiceItem> InvoiceItems { get; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}