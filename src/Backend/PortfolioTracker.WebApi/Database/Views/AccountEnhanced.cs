using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Views;

public class AccountEnhanced
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string CurrencyId { get; set; } = string.Empty;
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal TransactionCzk { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal ValueBefore { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueAfter { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueAfterCZK { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ConversionRate { get; set; }
}
