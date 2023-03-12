namespace PortfolioTracker.WebApi.Business.Models;

public class AccountWithTrade
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<AccountHistoryRow> History { get; set; } = Array.Empty<AccountHistoryRow>();

    // public decimal Value { get; set; }
    // public decimal ValueCZK { get; set; }
    // public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
}
