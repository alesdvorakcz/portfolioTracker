
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CurrencyValueHistoryToAdd
{
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
