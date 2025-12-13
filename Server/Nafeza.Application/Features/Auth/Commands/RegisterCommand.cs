using MediatR;
using Microsoft.EntityFrameworkCore;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Domain.Entities;
using Nafeza.Domain.Enums;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Nafeza.Application.Features.Auth.Commands
{
    // 1. The Data we expect from the Frontend
    public class RegisterCommand : IRequest<int>
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Type { get; set; } // 1 = Importer, 2 = Exporter
        public string? TaxId { get; set; }   // Only for Importers
        public string? CargoXId { get; set; } // Only for Exporters
    }

    // 2. The Logic to save it
    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public RegisterCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            // A. Validation: Check if user already exists
            if (await _context.Parties.AnyAsync(u => u.Email == request.Email))
            {
                throw new Exception("Email is already registered.");
            }

            if (!string.IsNullOrEmpty(request.TaxId) && await _context.Parties.AnyAsync(u => u.TaxId == request.TaxId))
            {
                throw new Exception("This Tax ID is already registered.");
            }

            // B. Create the Entity
            var partyType = (PartyType)request.Type;

            // We use a helper method or direct assignment since the Constructor we made earlier was strict
            // Let's assume we can create it directly or update Party.cs to allow this flexibility.
            // Since we added 'Password' manually to the class in previous steps, we assign it here.

            // NOTE: We are creating a new Party entity. 
            // Ensure your Party.cs constructor allows this, or use object initializer if the setters are public.
            // Based on our previous Party.cs code, the setters were private, so we should use the constructor.

            // Let's handle the identifier logic
            string identifier = partyType == PartyType.Importer ? request.TaxId : request.CargoXId;

            var newUser = new Party(request.Name, partyType, request.Email, identifier);

            // C. Set the Password (Crucial!)
            // We need a way to set the password. Since property is private set, 
            // we assume we updated Party.cs to include Password in constructor OR we use Reflection/Private method.
            // For simplicity in this fix, we will modify the Party.cs Entity to allow setting password 
            // OR we assume you made the setter public.

            // *hack for interview demo*: We will set the private password property via reflection if needed, 
            // OR ideally, you update Party.cs. Let's assume you update Party.cs (Step 2 below).
            newUser.SetPassword(request.Password);

            _context.Parties.Add(newUser);
            await _context.SaveChangesAsync(cancellationToken);

            return newUser.Id;
        }
    }
}