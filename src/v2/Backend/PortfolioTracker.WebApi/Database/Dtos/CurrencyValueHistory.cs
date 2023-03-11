namespace PortfolioTracker.WebApi.Database.Dtos;

public class CurrencyValueHistory
{
    public int Id { get; set; }
    public string CurrencyId { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public decimal ConversionRate { get; set; }
}
