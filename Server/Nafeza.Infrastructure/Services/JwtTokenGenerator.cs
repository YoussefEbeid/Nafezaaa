using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Domain.Entities;

namespace Nafeza.Infrastructure.Services
{
    public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IConfiguration _configuration;

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string GenerateToken(Party user)
        {
            // 1. Define Claims (Data inside the token)
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Name, user.Name),
                new Claim("TaxId", user.TaxId ?? "EXT"), // Store TaxID in token
                new Claim("Role", user.Type.ToString())
            };

            // 2. Get Secret Key (In real app, from appsettings.json)
            // For Demo: Hardcoded secret key (Must be > 16 chars)
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("NafezaSuperSecretKeyForInterview2025"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // 3. Build Token
            var token = new JwtSecurityToken(
                issuer: "NafezaAPI",
                audience: "NafezaClient",
                claims: claims,
                expires: DateTime.Now.AddDays(1), // Token valid for 1 day
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}