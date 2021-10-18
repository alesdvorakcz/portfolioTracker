
namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfInstrumentValueHistoryToAdd
{
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
