
namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfValueHistoryToAdd
{
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
