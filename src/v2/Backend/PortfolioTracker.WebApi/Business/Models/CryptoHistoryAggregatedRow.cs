namespace PortfolioTracker.WebApi.Business.Models;

public class CryptoHistoryAggregatedRow
{
    public DateTime DateStart { get; set; }
    public DateTime DateEnd { get; set; }
    public decimal? ConversionRate { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal UnitsChange { get; set; }
    public decimal UnitsTotal { get; set; }
    public decimal Transaction { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal StakedUnits { get; set; }
    public decimal CumulativeStakedUnits { get; set; }
}
