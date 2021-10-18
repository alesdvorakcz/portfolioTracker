
namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfTradeHistoryToEdit
{
    public DateTime Date { get; set; }
    public int Amount { get; set; }
    public decimal UnitPrice { get; set; }
}
