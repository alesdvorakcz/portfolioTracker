namespace PortfolioTracker.WebApi.Database.Entity;

public class CryptoCurrencyWallet
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public string CryptoCurrencyId { get; set; } = string.Empty;
    public CryptoCurrency CryptoCurrency { get; set; } = null!;
    public List<CryptoCurrencyTrade> TradeHistory { get; set; } = null!;
}
