namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfToEdit
{
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ISIN { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;
}
