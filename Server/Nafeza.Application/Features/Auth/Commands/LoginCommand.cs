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
    public class LoginCommand : IRequest<LoginResponseDto>
    {
        // Can be TaxId, Email, or CargoXId
        public string Identifier { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    // The Handler
    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginResponseDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public LoginCommandHandler(IApplicationDbContext context, IJwtTokenGenerator tokenGenerator)
        {
            _context = context;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<LoginResponseDto> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            // 1. Find User by TaxId, Email, or CargoXId
            // Supports: Importer (TaxId or Email), Exporter (Email or CargoXId)
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

            // 2. Validate Password
            // NOTE: In a real production app, you MUST use BCrypt hashing here.
            // For this Interview Demo, we check against the stored password.
            if (string.IsNullOrEmpty(user.Password) || request.Password != user.Password)
            {
                throw new Exception("Invalid Password.");
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