using PortfolioTracker.WebApi.Database;

namespace PortfolioTracker.WebApi.Contracts.Result;

public class DashboardAccount
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public AssetClass Category { get; set; }
    public string CurrencyId { get; set; } = string.Empty;

    public decimal? TotalTransactionsCZK { get; set; }
    public decimal? TotalValueCZK { get; set; }

    public IEnumerable<AccountValueHistory> History { get; set; } = Array.Empty<AccountValueHistory>();
}
