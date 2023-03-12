
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CurrencyValueHistoryRow
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
