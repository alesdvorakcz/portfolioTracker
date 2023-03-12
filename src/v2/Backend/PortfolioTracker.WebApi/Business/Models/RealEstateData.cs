namespace PortfolioTracker.WebApi.Business.Models;

public class RealEstateData
{
    public IEnumerable<RealEstate> RealEstates { get; set; } = Array.Empty<RealEstate>();
    // public IEnumerable<NetWorthHistory> History { get; set; } = Array.Empty<NetWorthHistory>();
    public decimal OwnValue { get; set; }
    public decimal TotalValue { get; set; }
    public decimal RemainingMortage { get; set; }
    public decimal TotalIncome { get; set; }
}
