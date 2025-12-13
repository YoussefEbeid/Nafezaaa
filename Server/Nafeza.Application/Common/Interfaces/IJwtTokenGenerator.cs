using Nafeza.Domain.Entities;

namespace Nafeza.Application.Common.Interfaces
{
    public interface IJwtTokenGenerator
    {
        // Generates a secure string containing User ID and Role
        string GenerateToken(Party user);
    }
}