
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CryptoCurrencyValueHistoryToEdit
{
    public DateTime Date { get; set; }
    public decimal ConversionRateUSD { get; set; }
    public decimal ConversionRateEUR { get; set; }
}
