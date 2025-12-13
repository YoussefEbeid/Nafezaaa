using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nafeza.Domain.Entities;

namespace Nafeza.Infrastructure.Persistence.Configurations
{
    public class AcidRequestConfiguration : IEntityTypeConfiguration<AcidRequest>
    {
        public void Configure(EntityTypeBuilder<AcidRequest> builder)
        {
            // Relationship: A Request requires an Importer
            builder.HasOne(x => x.Importer)
                .WithMany()
                .HasForeignKey(x => x.ImporterId)
                .OnDelete(DeleteBehavior.Restrict); // Don't delete the Company if a Request is deleted!

            // Relationship: A Request requires an Exporter
            builder.HasOne(x => x.Exporter)
                .WithMany()
                .HasForeignKey(x => x.ExporterId)
                .OnDelete(DeleteBehavior.Restrict);

            // The ACID number (the 19-digit key) must be indexed for fast searching
            builder.HasIndex(x => x.AcidNumber);
        }
    }
}