namespace PortfolioTracker.WebApi.Business.Models;

public class AccountData
{
    public IEnumerable<AccountWithTrade> Accounts { get; set; } = Array.Empty<AccountWithTrade>();
    // public IEnumerable<NetWorthHistory> History { get; set; } = Array.Empty<NetWorthHistory>();
    // public IEnumerable<NetWorthHistory> MonthlyHistory { get; set; } = Array.Empty<NetWorthHistory>();
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }
}
