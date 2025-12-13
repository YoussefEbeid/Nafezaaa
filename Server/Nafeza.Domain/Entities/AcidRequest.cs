using System;
using System.Collections.Generic;
using System.Linq;
using Nafeza.Domain.Common;
using Nafeza.Domain.Enums;
using Nafeza.Domain.Exceptions;

namespace Nafeza.Domain.Entities
{
    public class AcidRequest : BaseEntity
    {
        // 19-Digit Number (e.g., 2025-EG-12345678901234)
        // Nullable because it doesn't exist when you first create the draft.
        public string? AcidNumber { get; private set; }

        public int ImporterId { get; private set; }
        public virtual Party Importer { get; private set; } = null!;

        public int ExporterId { get; private set; }
        public virtual Party Exporter { get; private set; } = null!;

        public ShipmentStatus Status { get; private set; }
        public DateTime? ExpiryDate { get; private set; }

        // Navigation Property: One Request has Many Items
        private readonly List<InvoiceItem> _items = new();
        public IReadOnlyCollection<InvoiceItem> Items => _items.AsReadOnly();

        protected AcidRequest() { }

        public AcidRequest(int importerId, int exporterId)
        {
            ImporterId = importerId;
            ExporterId = exporterId;
            Status = ShipmentStatus.Draft;
        }

        // --- Domain Logic Methods ---

        public void AddItem(string hsCode, string description, decimal qty, decimal price, decimal weight)
        {
            if (Status != ShipmentStatus.Draft)
                throw new NafezaDomainException("Cannot add items to a shipment that is already submitted.");

            var item = new InvoiceItem(hsCode, description, qty, price, weight);
            _items.Add(item);
        }

        public void Submit()
        {
            if (!_items.Any())
                throw new NafezaDomainException("Cannot submit an empty shipment. Add invoice items first.");

            if (Status != ShipmentStatus.Draft)
                throw new NafezaDomainException("Request is already submitted.");

            Status = ShipmentStatus.Submitted;
            // In a real Event-Driven system, we would raise an event here: "OrderSubmittedEvent"
        }

        public void Approve(string generatedAcidNumber)
        {
            if (Status != ShipmentStatus.Submitted && Status != ShipmentStatus.DocsUploaded)
                throw new NafezaDomainException("Cannot approve a shipment that hasn't been submitted or checked.");

            AcidNumber = generatedAcidNumber;
            Status = ShipmentStatus.Approved;

            // ACID is valid for 6 months per Egyptian Customs Law
            ExpiryDate = DateTime.UtcNow.AddMonths(6);
        }
    }
}