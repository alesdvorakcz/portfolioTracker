
namespace PortfolioTracker.WebApi.Contracts.Result;

public class EtfValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public decimal Value { get; set; }
}
