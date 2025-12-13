namespace Nafeza.Domain.Enums
{
    // The Lifecycle of an ACI Request (The Nafeza Workflow)
    public enum ShipmentStatus
    {
        Draft = 0,          // Importer is still typing data
        Submitted = 1,      // Sent to Nafeza, waiting for Exporter to upload docs
        DocsUploaded = 2,   // Exporter (via CargoX) has uploaded Invoice/BL
        RiskAssessment = 3, // System is checking for banned goods or high-risk origins
        Approved = 4,       // ACID Number Issued (Green)
        Rejected = 5,       // Rejected by Risk Management (Red)
        Cancelled = 6       // Cancelled by Importer
    }
}