namespace PortfolioTracker.WebApi.Database.Dtos;

public class CryptoValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
    public int CryptoId { get; set; }
}
