
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CurrencyValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
