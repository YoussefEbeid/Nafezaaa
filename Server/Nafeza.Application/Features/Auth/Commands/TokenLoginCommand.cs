using MediatR;
using Microsoft.EntityFrameworkCore;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Application.DTOs.Auth;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Nafeza.Application.Features.Auth.Commands
{
    // The Request
    public class TokenLoginCommand : IRequest<LoginResponseDto>
    {
        public string Identifier { get; set; } = string.Empty; // TaxId, Email, or CargoXId
        public string TokenPin { get; set; } = string.Empty;
        public string CertificatePassword { get; set; } = string.Empty;
    }

    // The Handler
    public class TokenLoginCommandHandler : IRequestHandler<TokenLoginCommand, LoginResponseDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public TokenLoginCommandHandler(IApplicationDbContext context, IJwtTokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<LoginResponseDto> Handle(TokenLoginCommand request, CancellationToken cancellationToken)
        {
            // 1. Find User by TaxId, Email, or CargoXId
            var user = await _context.Parties
                .FirstOrDefaultAsync(u => 
                    (u.TaxId != null && u.TaxId == request.Identifier) ||
                    u.Email == request.Identifier ||
                    (u.CargoXId != null && u.CargoXId == request.Identifier),
                    cancellationToken);

            if (user == null)
            {
                throw new Exception("Invalid identifier or User not found.");
            }

            // 2. Validate Token PIN and Certificate Password
            // For demo: We'll use a simple validation scheme
            // In production, these would be stored securely and validated against the e-Token device
            // For now, we'll validate:
            // - Token PIN: Must match a pattern or stored value (using password hash as demo)
            // - Certificate Password: Must match another pattern or stored value
            
            // Demo validation: Check if token PIN and certificate password are provided and not empty
            // In a real system, you'd validate against stored token credentials or the e-Token device itself
            if (string.IsNullOrWhiteSpace(request.TokenPin) || string.IsNullOrWhiteSpace(request.CertificatePassword))
            {
                throw new Exception("Token PIN and Certificate Password are required.");
            }

            // For demo purposes, we'll accept any non-empty token PIN and certificate password
            // In production, you would:
            // 1. Connect to the e-Token USB device
            // 2. Validate the certificate password against the device
            // 3. Verify the token PIN unlocks the device
            // 4. Extract and validate the digital certificate
            
            // For now, we'll do a simple validation: ensure both are at least 4 characters
            if (request.TokenPin.Length < 4 || request.CertificatePassword.Length < 4)
            {
                throw new Exception("Invalid Token PIN or Certificate Password. Both must be at least 4 characters.");
            }

            // 3. Generate JWT Token
            var token = _tokenGenerator.GenerateToken(user);

            // 4. Return Data
            return new LoginResponseDto
            {
                UserId = user.Id,
                Name = user.Name,
                Role = user.Type.ToString(),
                Token = token
            };
        }
    }
}

