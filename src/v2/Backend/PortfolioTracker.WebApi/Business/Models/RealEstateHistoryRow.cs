namespace PortfolioTracker.WebApi.Business.Models;

public class RealEstateHistoryRow
{
    public DateTime Date { get; set; }
    public decimal Income { get; set; }
    public decimal RemainingMortage { get; set; }
    public decimal EstimatedPrice { get; set; }


    public decimal OwnValue { get; set; }
    public decimal TotalValueIncludingIncome { get; set; }
    public decimal CumulativeIncome { get; set; }
}
