using System.Threading.Tasks;

namespace Nafeza.Application.Common.Interfaces
{
    // The contract for the Blockchain service.
    // Infrastructure layer implements this (MockCargoXService).
    public interface ICargoXService
    {
        Task<bool> ValidateExporterIdAsync(string cargoXId);
        Task<string> UploadDocumentAsync(byte[] fileData, string fileName);
    }
}