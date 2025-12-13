using System;

namespace Nafeza.Domain.Common
{
    // abstract: You cannot create an instance of just "BaseEntity". 
    // It must be inherited (e.g., by User or Shipment).
    public abstract class BaseEntity
    {
        public int Id { get; set; }

        // Auditing fields: Essential for Government/Customs logs.
        // We need to know WHEN data changed.
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public DateTime? LastModifiedAt { get; set; }
        public string? LastModifiedBy { get; set; }
    }
}