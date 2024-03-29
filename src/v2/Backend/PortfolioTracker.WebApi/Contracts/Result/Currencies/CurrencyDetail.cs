
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CurrencyDetail
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public IEnumerable<CurrencyValueHistoryRow> History { get; set; } = Array.Empty<CurrencyValueHistoryRow>();
}
