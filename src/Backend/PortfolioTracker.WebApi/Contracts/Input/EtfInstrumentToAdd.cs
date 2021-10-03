
namespace PortfolioTracker.WebApi.Contracts.Input;

public class EtfInstrumentToAdd
{
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Isin { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;
}
