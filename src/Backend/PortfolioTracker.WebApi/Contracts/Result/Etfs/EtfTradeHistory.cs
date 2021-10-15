
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfTradeHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public decimal UnitPrice { get; set; }
}
