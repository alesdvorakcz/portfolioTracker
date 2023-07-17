namespace PortfolioTracker.WebApi.Business.Models;

public class AccountData
{
    public IEnumerable<AccountWithTrade> Accounts { get; set; } = Array.Empty<AccountWithTrade>();
    public IEnumerable<AllAccountsHistoryAggregatedRow> History { get; set; } = Array.Empty<AllAccountsHistoryAggregatedRow>();
    public IEnumerable<AllAccountsHistoryAggregatedRow> MonthlyHistory { get; set; } = Array.Empty<AllAccountsHistoryAggregatedRow>();
    public IEnumerable<AllAccountsHistoryAggregatedRow> YearlyHistory { get; set; } = Array.Empty<AllAccountsHistoryAggregatedRow>();

    public decimal TotalValueCZK { get; set; }
    public decimal CumulativeTransactionsCZK { get; set; }
    public decimal CumulativeProfitCZK { get; set; }

    public double ProfitPercentagePlainCZK { get; set; }
    public double? ProfitPercentageCZK { get; set; }
    public double? ProfitPercentagePaCZK { get; set; }
}
