namespace PortfolioTracker.WebApi.Database.Dtos;

public class EtfValueHistory
{
    public int Id { get; set; }
    public int EtfId { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
