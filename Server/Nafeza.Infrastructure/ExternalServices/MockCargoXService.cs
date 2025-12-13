using Nafeza.Application.Common.Interfaces;
using System.Threading.Tasks;

namespace Nafeza.Infrastructure.External
{
    public class MockCargoXService : ICargoXService
    {
        // Simulates checking if a Foreign Exporter is registered on Blockchain
        public async Task<bool> ValidateExporterIdAsync(string cargoXId)
        {
            // Simulate API Latency
            await Task.Delay(500);

            // Logic: Assume any ID starting with "CX-" is valid
            return cargoXId.StartsWith("CX-");
        }

        // Simulates uploading a document to the Blockchain
        public async Task<string> UploadDocumentAsync(byte[] fileData, string fileName)
        {
            await Task.Delay(1000);

            // Return a fake "Hash" of the document on the blockchain
            return $"HASH-{Guid.NewGuid().ToString().Substring(0, 8)}";
        }
    }
}