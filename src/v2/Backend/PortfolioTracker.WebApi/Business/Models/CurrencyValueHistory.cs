namespace PortfolioTracker.WebApi.Business.Models;

public class CurrencyValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
