namespace PortfolioTracker.WebApi.Services.Yahoo.Models;

public class CurrencyDailyValue
{
    public DateTime Day { get; set; }
    public decimal Open { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Close { get; set; }
}
