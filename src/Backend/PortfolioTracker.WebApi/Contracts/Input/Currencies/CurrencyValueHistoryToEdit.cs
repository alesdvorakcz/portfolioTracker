
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CurrencyValueHistoryToEdit
{
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
