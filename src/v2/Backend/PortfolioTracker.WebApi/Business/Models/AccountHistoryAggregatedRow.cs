namespace PortfolioTracker.WebApi.Business.Models;

public class AccountHistoryAggregatedRow
{
    public DateTime DateStart { get; set; }
    public DateTime DateEnd { get; set; }
    public decimal ValueBefore { get; set; }
    public decimal? ValueBeforeCZK { get; set; }
    public decimal TransactionCZK { get; set; }
    public decimal Transaction { get; set; }
    public decimal ValueAfter { get; set; }
    public decimal? ValueAfterCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal Profit { get; set; }
    public decimal? ProfitCZK { get; set; }
    public double? ProfitPercentage { get; set; }
    public double? ProfitPercentageCZK { get; set; }
    public decimal CumulativeProfit { get; set; }
    public decimal? CumulativeProfitCZK { get; set; }
}
