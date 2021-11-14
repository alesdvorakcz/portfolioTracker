
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoCurrencyTrade
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ChangeEUR { get; set; }
    public decimal Change { get; set; }
    public decimal AmountAfter { get; set; }
}
