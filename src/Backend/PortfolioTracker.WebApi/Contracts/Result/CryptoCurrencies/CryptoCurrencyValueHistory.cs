
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoCurrencyValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ConverstionRateUSD { get; set; }
    public decimal ConverstionRateEUR { get; set; }
}
