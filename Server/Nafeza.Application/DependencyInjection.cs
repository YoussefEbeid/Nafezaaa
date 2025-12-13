using Microsoft.Extensions.DependencyInjection;
using MediatR;
using System.Reflection;

namespace Nafeza.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplication(this IServiceCollection services)
        {
            // Automatically finds all Commands and Queries in this project
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

            return services;
        }
    }
}