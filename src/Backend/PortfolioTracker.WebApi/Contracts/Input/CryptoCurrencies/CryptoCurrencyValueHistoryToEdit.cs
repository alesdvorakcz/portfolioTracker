
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CryptoCurrencyValueHistoryToEdit
{
    public DateTime Date { get; set; }
    public decimal ConverstionRateUSD { get; set; }
    public decimal ConverstionRateEUR { get; set; }
}
