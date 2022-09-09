namespace PortfolioTracker.WebApi.Excel.Models;

public class RealEstate
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal StartingPrice { get; set; }
    public decimal OwnStartingCapital { get; set; }
}
