
namespace PortfolioTracker.WebApi.Contracts.Input;

public class CryptoCurrencyTradeToEdit
{
    public DateTime Date { get; set; }
    public decimal ChangeEUR { get; set; }
    public decimal Change { get; set; }
    public decimal AmountAfter { get; set; }
}
