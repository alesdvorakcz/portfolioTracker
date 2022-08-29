namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfDetail
{
    public int Id { get; set; }
    public string Ticker { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string ISIN { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;

    public IEnumerable<EtfValueHistory> History { get; set; } = Array.Empty<EtfValueHistory>();
}