namespace PortfolioTracker.WebApi.Business.Models;

public class EtfDetailHistoryRow
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public decimal? ConversionRate { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public int UnitsChange { get; set; }
    public int UnitsTotal { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal Fee { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal Transaction { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
}
