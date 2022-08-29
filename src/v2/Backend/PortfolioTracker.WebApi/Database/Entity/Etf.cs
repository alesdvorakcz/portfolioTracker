namespace PortfolioTracker.WebApi.Database.Entity;

public class Etf
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Ticker { get; set; } = string.Empty;
    public string ISIN { get; set; } = string.Empty;

    public string CurrencyId { get; set; } = string.Empty;
    public Currency Currency { get; set; } = null!;

    public List<EtfValueHistory> ValueHistory { get; set; } = null!;
}
