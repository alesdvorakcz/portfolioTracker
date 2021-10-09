
namespace PortfolioTracker.WebApi.Services;

public class CNBCurrencyValueHistory
{
    public string CurrencyId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
