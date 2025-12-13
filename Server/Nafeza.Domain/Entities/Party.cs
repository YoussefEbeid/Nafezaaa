using Nafeza.Domain.Common;
using Nafeza.Domain.Enums;
using Nafeza.Domain.Exceptions;

namespace Nafeza.Domain.Entities
{
    public class Party : BaseEntity
    {
        // Private setters enforce that you must use the Constructor or Methods to change data.
        public string Name { get; private set; }
        public string? TaxId { get; private set; } // Required for Importers
        public string? CargoXId { get; private set; } // Required for Foreign Exporters
        public string Email { get; private set; }
        public PartyType Type { get; private set; }
        public string? Password { get; private set; } // For authentication

        // Constructor for EF Core
        protected Party() { }

        public Party(string name, PartyType type, string email, string identifier)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new NafezaDomainException("Party Name is required.");

            Name = name;
            Type = type;
            Email = email;

            // Business Rule: Validate Identifiers based on Type
            if (type == PartyType.Importer)
            {
                if (string.IsNullOrWhiteSpace(identifier))
                    throw new NafezaDomainException("Egyptian Importers must have a Tax ID.");
                TaxId = identifier;
            }
            else if (type == PartyType.ForeignExporter)
            {
                if (string.IsNullOrWhiteSpace(identifier))
                    throw new NafezaDomainException("Foreign Exporters must have a CargoX ID.");
                CargoXId = identifier;
            }
        }

        // --- NEW METHOD ADDED HERE ---
        public void SetPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
                throw new NafezaDomainException("Password must be at least 6 characters.");

            this.Password = password;
        }
    }
}