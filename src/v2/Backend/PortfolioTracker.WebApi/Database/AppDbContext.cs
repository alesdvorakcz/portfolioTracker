using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Database.Entity;

namespace PortfolioTracker.WebApi.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Currency> Currencies { get; set; } = null!;
    public DbSet<CurrencyValueHistory> CurrencyValueHistory { get; set; } = null!;
    public DbSet<Etf> Etfs { get; set; } = null!;
    public DbSet<EtfValueHistory> EtfValueHistory { get; set; } = null!;
    public DbSet<Crypto> Cryptos { get; set; } = null!;
    public DbSet<CryptoValueHistory> CryptoValueHistory { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}
