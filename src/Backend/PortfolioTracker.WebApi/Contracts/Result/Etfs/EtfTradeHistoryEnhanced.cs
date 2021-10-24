
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfTradeHistoryEnhanced
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public decimal? ConversionRate { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public int AmountChange { get; set; }
    public int AmountTotal { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal? CumulativeTransactionsCZK { get; set; }
}
