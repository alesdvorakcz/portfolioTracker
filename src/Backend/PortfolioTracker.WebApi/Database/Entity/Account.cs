using static PortfolioTracker.WebApi.Database.AppDbContext;

namespace PortfolioTracker.WebApi.Database.Entity;

public class Account
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public AssetClass Category { get; set; }

    public string CurrencyId { get; set; } = string.Empty;
    public Currency Currency { get; set; } = null!;

    public List<AccountValueHistory> History { get; set; } = null!;
}
