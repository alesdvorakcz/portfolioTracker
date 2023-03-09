namespace PortfolioTracker.WebApi.Contracts.Result;

public class NetWorthHistory
{
    public DateTime Date { get; set; }
    public decimal? ValueCZK { get; set; }
    public decimal TransactionsCZK { get; set; }
}
