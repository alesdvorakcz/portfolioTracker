namespace PortfolioTracker.WebApi.Contracts.Result;

public class AccountTrade
{
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public decimal? ConversionRate { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal Transaction { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
}
