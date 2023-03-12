namespace PortfolioTracker.WebApi.Business.Models;

public class Crypto
{
    public int Id { get; set; }
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<CryptoValueHistoryRow> History { get; set; } = Array.Empty<CryptoValueHistoryRow>();
}
