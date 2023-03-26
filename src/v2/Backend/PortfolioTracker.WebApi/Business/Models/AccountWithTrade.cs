namespace PortfolioTracker.WebApi.Business.Models;

public class AccountWithTrade
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<AccountHistoryRow> History { get; set; } = Array.Empty<AccountHistoryRow>();
    public IEnumerable<AccountHistoryAggregatedRow> MonthlyHistory { get; set; } = Array.Empty<AccountHistoryAggregatedRow>();
    public IEnumerable<AccountHistoryAggregatedRow> YearlyHistory { get; set; } = Array.Empty<AccountHistoryAggregatedRow>();

    public decimal Value { get; set; }
    public decimal ValueCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeTransactions { get; set; }
    public decimal CumulativeProfit { get; set; }
    public decimal CumulativeProfitCZK { get; set; }

    public double ProfitPercentagePlain { get; set; }
    public double ProfitPercentagePlainCZK { get; set; }
    public double? ProfitPercentage { get; set; }
    public double? ProfitPercentageCZK { get; set; }
    public double? ProfitPercentagePa { get; set; }
    public double? ProfitPercentagePaCZK { get; set; }
}
