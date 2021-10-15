using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Views;

public class CurrencyEnhanced
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public DateTime? Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ConversionRate { get; set; }
}
