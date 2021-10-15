
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CurrencyDetail
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public DateTime? Date { get; set; }
    public decimal? ConversionRate { get; set; }

    public IEnumerable<CurrencyValueHistory> History { get; set; } = Array.Empty<CurrencyValueHistory>();
}
