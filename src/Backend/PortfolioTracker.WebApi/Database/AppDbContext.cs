using PortfolioTracker.WebApi.Database.Entity;
using Microsoft.EntityFrameworkCore;

namespace PortfolioTracker.WebApi.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Portfolio> Portfolios { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}