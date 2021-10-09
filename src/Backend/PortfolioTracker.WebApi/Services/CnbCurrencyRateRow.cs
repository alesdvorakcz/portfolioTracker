namespace PortfolioTracker.WebApi.Services;

public class CnbCurrencyRateRow
{
    public string Country { get; set; } = string.Empty;
    public string CurrencyName { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = string.Empty;
    public int Amount { get; set; }
    public decimal ConversionRate { get; set; }
}
