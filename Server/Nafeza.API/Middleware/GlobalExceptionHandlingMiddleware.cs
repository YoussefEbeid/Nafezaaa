using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Nafeza.Domain.Exceptions;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Nafeza.API.Middleware
{
    public class GlobalExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlingMiddleware> _logger;

        public GlobalExceptionHandlingMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                // Continue to the Controller...
                await _next(context);
            }
            catch (Exception ex)
            {
                // If the Controller crashes, catch it here
                _logger.LogError(ex, "An unhandled exception occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            // Default: 500 Internal Server Error
            var response = new { message = "An internal server error occurred." };
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // Special handling for our custom Domain Exceptions
            // If the error is "NafezaDomainException", it means the USER did something wrong (e.g., Empty Invoice).
            // So we return 400 Bad Request instead of 500.
            if (exception is NafezaDomainException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                response = new { message = exception.Message };
            }

            return context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}