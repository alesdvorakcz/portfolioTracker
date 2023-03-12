namespace PortfolioTracker.WebApi.Business.Models;

public class RealEstate
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public decimal StartingPrice { get; set; }
    public decimal OwnStartingCapital { get; set; }

    public IEnumerable<RealEstateHistoryRow> History { get; set; } = Array.Empty<RealEstateHistoryRow>();

    public decimal OwnValue { get; set; }
    public decimal TotalValue { get; set; }
    public decimal RemainingMortage { get; set; }
    public decimal TotalIncome { get; set; }
}
