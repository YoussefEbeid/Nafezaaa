using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Nafeza.Domain.Entities;
using System.IO;

namespace Nafeza.Infrastructure.Persistence.Configurations
{
    public class PartyConfiguration : IEntityTypeConfiguration<Party>
    {
        public void Configure(EntityTypeBuilder<Party> builder)
        {
            // Primary Key
            builder.HasKey(x => x.Id);

            // Name is required, max 200 chars
            builder.Property(x => x.Name)
                .HasMaxLength(200)
                .IsRequired();

            // IMPORTANT: TaxId must be UNIQUE in the database.
            // This prevents duplicate Importers.
            builder.HasIndex(x => x.TaxId)
                .IsUnique()
                .HasFilter("[TaxId] IS NOT NULL"); // Only check uniqueness if TaxId exists

            // Configurations for CargoX ID
            builder.Property(x => x.CargoXId)
                .HasMaxLength(100);

            // Password for authentication
            builder.Property(x => x.Password)
                .HasMaxLength(255);
        }
    }
}