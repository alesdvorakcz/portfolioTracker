namespace PortfolioTracker.WebApi.Business.Models;

public class CryptoValueHistoryRow
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
