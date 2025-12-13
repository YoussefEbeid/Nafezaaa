using Nafeza.Domain.Common;
using Nafeza.Domain.Exceptions;

namespace Nafeza.Domain.Entities
{
    public class InvoiceItem : BaseEntity
    {
        public int AcidRequestId { get; private set; }
        public string HSCode { get; private set; } // e.g. "851713" (Smartphones)
        public string Description { get; private set; }
        public decimal Quantity { get; private set; }
        public decimal UnitPrice { get; private set; }
        public decimal TotalValue { get; private set; }
        public decimal NetWeight { get; private set; } // Critical for Freight calculation
        public decimal GrossWeight { get; private set; }

        protected InvoiceItem() { }

        public InvoiceItem(string hsCode, string description, decimal quantity, decimal unitPrice, decimal weight)
        {
            if (hsCode.Length < 4)
                throw new NafezaDomainException("HS Code must be at least 4 digits.");

            if (quantity <= 0)
                throw new NafezaDomainException("Quantity must be greater than zero.");

            HSCode = hsCode;
            Description = description;
            Quantity = quantity;
            UnitPrice = unitPrice;
            TotalValue = quantity * unitPrice; // Logic: Auto-calculate total
            NetWeight = weight;
            GrossWeight = weight * 1.1m; // Logic: Approx packaging weight if not provided
        }
    }
}