namespace PortfolioTracker.WebApi.Database.Entity;

public class CryptoCurrency
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public List<CryptoCurrencyValueHistory> History { get; set; } = null!;
    public List<CryptoCurrencyWallet> Wallets { get; set; } = null!;
}
