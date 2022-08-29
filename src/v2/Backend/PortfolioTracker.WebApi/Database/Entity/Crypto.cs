namespace PortfolioTracker.WebApi.Database.Entity;

public class Crypto
{
    public int Id { get; set; }
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;
    public Currency Currency { get; set; } = null!;

    public List<CryptoValueHistory> ValueHistory { get; set; } = null!;
}
