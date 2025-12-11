using System;

namespace Nafeza.Application.DTOs
{
    public class AcidRequestDto
    {
        public int Id { get; set; }
        public string? AcidNumber { get; set; } // The 19-digit number
        public string ImporterName { get; set; } = string.Empty;
        public string ExporterName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime RequestDate { get; set; }
        public int ItemCount { get; set; }
    }

    public class ValidateAciDto
    {
        public string AcidNumber { get; set; } = string.Empty;
        public string ImporterTaxId { get; set; } = string.Empty;
        public string ExporterId { get; set; } = string.Empty;
    }
}