namespace PortfolioTracker.WebApi.Business.Models;

public class NetWorthData
{
    public decimal TotalValueCZK { get; set; }
    public decimal TotalTransactionsCZK { get; set; }

    public IEnumerable<NetWorthHistoryRow> History { get; set; } = Array.Empty<NetWorthHistoryRow>();
    public IEnumerable<NetWorthHistoryRow> MonthlyHistory { get; set; } = Array.Empty<NetWorthHistoryRow>();
}
