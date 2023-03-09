namespace PortfolioTracker.WebApi.Services.CoinGecko.Models;

public class CryptoDailyValue
{
    public DateTime Day { get; set; }
    public decimal Close { get; set; }

    public override string ToString()
    {
        return $"{Day:dd.MM.yyyy} - {Close}";
    }
}
