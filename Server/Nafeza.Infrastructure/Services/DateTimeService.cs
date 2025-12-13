using System;

namespace Nafeza.Infrastructure.Services
{
    // We will define the Interface IDateTime in the Application layer later.
    // For now, this is the concrete implementation.
    public class DateTimeService
    {
        public DateTime Now => DateTime.UtcNow;
    }
}