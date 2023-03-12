namespace PortfolioTracker.WebApi.Business.Models;

public class NetWorthHistoryRow
{
    public DateTime Date { get; set; }
    public decimal? ValueCZK { get; set; }
    public decimal TransactionsCZK { get; set; }
}
