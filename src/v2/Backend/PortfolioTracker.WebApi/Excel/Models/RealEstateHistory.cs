namespace PortfolioTracker.WebApi.Excel.Models;

public class RealEstateHistory
{
    public DateTime Date { get; set; }
    public string RealEstateId { get; set; } = string.Empty;
    public decimal Income { get; set; }
    public decimal RemainingMortage { get; set; }
    public decimal EstimatedPrice { get; set; }
}
