using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using PortfolioTracker.WebApi.Extensions;

namespace PortfolioTracker.WebApi.Database;

public partial class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var environmentName = Environment.GetEnvironmentVariable("NETCORE_ENVIRONMENT") ?? "Development";

        var configBuilder = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .AddJsonFile($"appsettings.{environmentName}.json", optional: true)
            .AddEnvironmentVariables()
            .AddEnvironmentVariables(prefix: "pfv2_");

        var config = configBuilder.Build();
        var dbConfig = config.GetSection("Database")?.Get<DatabaseConfig>();

        if (dbConfig == null)
            throw new Exception("Configuration does not contain 'Database' section");

        var builder = new DbContextOptionsBuilder<AppDbContext>();
        builder.UseSqlServer(config.GetConnectionStringFrom(dbConfig));

        return new AppDbContext(builder.Options);
    }
}