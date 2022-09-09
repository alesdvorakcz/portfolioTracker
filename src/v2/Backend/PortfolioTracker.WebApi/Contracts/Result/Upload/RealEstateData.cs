namespace PortfolioTracker.WebApi.Contracts.Result;

public class RealEstateData
{
    public IEnumerable<RealEstate> RealEstates { get; set; } = Array.Empty<RealEstate>();
    public decimal OwnValue { get; set; }
    public decimal TotalValue { get; set; }
    public decimal RemainingMortage { get; set; }
    public decimal TotalIncome { get; set; }
}
