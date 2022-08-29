
namespace PortfolioTracker.WebApi.Contracts.Result;

public class CryptoValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
