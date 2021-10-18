
namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfTradeHistoryToAdd
{
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public decimal UnitPrice { get; set; }
}
