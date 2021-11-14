namespace PortfolioTracker.WebApi.Services.Alphavantage.Models;

public class CryptoDailyValue
{
    public DateTime Day { get; set; }
    public decimal OpenEUR { get; set; }
    public decimal OpenUSD { get; set; }
    public decimal HighEUR { get; set; }
    public decimal HighUSD { get; set; }
    public decimal LowEUR { get; set; }
    public decimal LowUSD { get; set; }
    public decimal CloseEUR { get; set; }
    public decimal CloseUSD { get; set; }
}
