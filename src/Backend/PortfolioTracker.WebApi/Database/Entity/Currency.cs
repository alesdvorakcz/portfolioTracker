namespace PortfolioTracker.WebApi.Database.Entity;

public class Currency
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public List<CurrencyValueHistory> History { get; set; } = null!;
}
