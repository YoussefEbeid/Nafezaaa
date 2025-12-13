using System;

namespace Nafeza.Domain.Exceptions
{
    // We throw this when a Business Rule is violated.
    // Example: "Cannot issue ACID for an empty invoice."
    public class NafezaDomainException : Exception
    {
        public NafezaDomainException() { }
        public NafezaDomainException(string message) : base(message) { }
        public NafezaDomainException(string message, Exception inner) : base(message, inner) { }
    }
}