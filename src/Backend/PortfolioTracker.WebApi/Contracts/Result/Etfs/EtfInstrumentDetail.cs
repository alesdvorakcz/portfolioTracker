
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfInstrumentDetail
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Isin { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<EtfInstrumentValueHistory> ValueHistory { get; set; } = Array.Empty<EtfInstrumentValueHistory>();
    public IEnumerable<EtfTradeHistory> TradeHistory { get; set; } = Array.Empty<EtfTradeHistory>();
}
