using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Extensions;

public static class ConfigurationExtensions
{
    public static string GetConnectionStringFrom(this IConfiguration configuration, DatabaseConfig config, string connectionStringName = "DefaultConnection")
    {
        if (string.IsNullOrEmpty(config.Server) ||
            string.IsNullOrEmpty(config.Name) ||
            string.IsNullOrEmpty(config.User) ||
            string.IsNullOrEmpty(config.Password))
        {
            throw new ArgumentNullException(nameof(config));
        }

        return configuration.GetConnectionString(connectionStringName)
            .Replace("{{server}}", config.Server)
            .Replace("{{name}}", config.Name)
            .Replace("{{user}}", config.User)
            .Replace("{{password}}", config.Password);
    }
}