
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CurrencyDetail
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    public IEnumerable<CurrencyValueHistory> History { get; set; } = Array.Empty<CurrencyValueHistory>();
}
