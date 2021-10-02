namespace PortfolioTracker.WebApi.Database.Entity;

public class Portfolio
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}