using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class CurrencyValueHistory
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal ConversionRate { get; set; }

    public string CurrencyId { get; set; } = string.Empty;
    public Currency Currency { get; set; } = null!;
}
