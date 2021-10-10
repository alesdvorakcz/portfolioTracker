using Microsoft.EntityFrameworkCore;
using PortfolioTracker.WebApi.Database.Entity;

namespace PortfolioTracker.WebApi.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Portfolio> Portfolios { get; set; } = null!;

    public DbSet<Account> Accounts { get; set; } = null!;
    public DbSet<AccountValueHistory> AccountValueHistory { get; set; } = null!;
    public DbSet<Currency> Currencies { get; set; } = null!;
    public DbSet<CurrencyValueHistory> CurrencyValueHistory { get; set; } = null!;
    public DbSet<EtfInstrument> EtfInstruments { get; set; } = null!;
    public DbSet<EtfInstrumentValueHistory> EtfInstrumentValueHistory { get; set; } = null!;
    public DbSet<EtfTradeHistory> EtfTradeHistory { get; set; } = null!;

    public DbSet<Views.AccountValueHistoryEnhanced> AccountValueHistoryEnhanced { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Views.AccountValueHistoryEnhanced>(
            x => x.ToView("View_AccountValueHistoryEnhanced"));
    }
}