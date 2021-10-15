namespace PortfolioTracker.WebApi.Contracts.Result;

public class GetDataForDashboardResult
{
    public decimal? TotalTransactionsCZK { get; set; }
    public decimal? TotalValueCZK { get; set; }

    public IEnumerable<DashboardAccount> Accounts { get; set; } = Array.Empty<DashboardAccount>();
    public IEnumerable<AllAccountsHistoryValue> AllAccountsHistory { get; set; } = Array.Empty<AllAccountsHistoryValue>();
}
