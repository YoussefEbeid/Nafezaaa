using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nafeza.Application.Common.Interfaces;
using Nafeza.Infrastructure.External;
using Nafeza.Infrastructure.Persistence;
using Nafeza.Infrastructure.Services;

namespace Nafeza.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            // 1. Setup SQL Server Connection
            // We read the connection string from appsettings.json
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName)));

            // Register AppDbContext as IApplicationDbContext
            services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<AppDbContext>());

            // 2. Register Services
            services.AddTransient<DateTimeService>();
            services.AddTransient<ICargoXService, MockCargoXService>();

            return services;
        }
    }
}