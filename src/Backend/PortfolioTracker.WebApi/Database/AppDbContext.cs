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
    public DbSet<Views.AccountEnhanced> AccountsEnhanced { get; set; } = null!;
    public DbSet<Views.CurrencyEnhanced> CurrenciesEnhanced { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>()
            .Property(x => x.Category)
            .HasConversion<string>();

        modelBuilder.Entity<Views.AccountValueHistoryEnhanced>(
            x => x.ToView("View_AccountValueHistoryEnhanced"));

        modelBuilder.Entity<Views.AccountEnhanced>(
            x => x.ToView("View_AccountsEnhanced"));

        modelBuilder.Entity<Views.AccountEnhanced>()
            .Property(x => x.Category)
            .HasConversion<string>();

        modelBuilder.Entity<Views.CurrencyEnhanced>(
            x => x.ToView("View_CurrenciesEnhanced"));
    }
}