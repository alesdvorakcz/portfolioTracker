
using static PortfolioTracker.WebApi.Database.AppDbContext;

namespace PortfolioTracker.WebApi.Contracts.Result;

public class Account
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public AssetClass Category { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal TransactionCzk { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal? ConversionRate { get; set; }

    public decimal TransactionsCZKTotal { get; set; }
}
