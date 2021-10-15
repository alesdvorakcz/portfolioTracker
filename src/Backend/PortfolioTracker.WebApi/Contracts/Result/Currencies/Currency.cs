
namespace PortfolioTracker.WebApi.Contracts.Result;

public class Currency
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public DateTime? Date { get; set; }
    public decimal? ConversionRate { get; set; }
}
