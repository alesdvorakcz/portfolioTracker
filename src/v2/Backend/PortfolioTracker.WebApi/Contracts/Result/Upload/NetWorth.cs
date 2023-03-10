namespace PortfolioTracker.WebApi.Contracts.Result;

public class NetWorth
{
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }

    public IEnumerable<NetWorthHistory> History { get; set; } = Array.Empty<NetWorthHistory>();
    public IEnumerable<NetWorthHistory> MonthlyHistory { get; set; } = Array.Empty<NetWorthHistory>();
}
