namespace PortfolioTracker.WebApi.Services.Alphavantage.Models;

public class EtfDailyValue
{
    public DateTime Day { get; set; }
    public decimal Open { get; set; }
    public decimal High { get; set; }
    public decimal Low { get; set; }
    public decimal Close { get; set; }
    public decimal Volume { get; set; }
}
