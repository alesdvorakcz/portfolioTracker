
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoCurrencyValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ConversionRateUSD { get; set; }
    public decimal ConversionRateEUR { get; set; }
}
