namespace Nafeza.Application.DTOs.Auth
{
    // What the user sends from React
    public class LoginRequestDto
    {
        public string Identifier { get; set; } = string.Empty; // Can be TaxId, Email, or CargoXId
        public string Password { get; set; } = string.Empty;
        public bool IsETokenLogin { get; set; } = false; // "Visual" toggle for the interview
    }

    // Token Login Request
    public class TokenLoginRequestDto
    {
        public string Identifier { get; set; } = string.Empty; // TaxId, Email, or CargoXId
        public string TokenPin { get; set; } = string.Empty;
        public string CertificatePassword { get; set; } = string.Empty;
    }

    // What we send back
    public class LoginResponseDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty; // The JWT Key
        public string Role { get; set; } = string.Empty; // Importer vs Broker
    }
}
