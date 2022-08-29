namespace PortfolioTracker.WebApi.Contracts.Input;

public class CryptoToAdd
{
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;
}
