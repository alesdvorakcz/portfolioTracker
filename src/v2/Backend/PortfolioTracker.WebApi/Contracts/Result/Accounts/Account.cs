namespace PortfolioTracker.WebApi.Contracts.Result;

public class Account
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<AccountTrade> History { get; set; } = Array.Empty<AccountTrade>();

    public decimal Value { get; set; }
    public decimal ValueCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
}
