using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Views;

public class AccountValueHistoryEnhanced
{
    public int Id { get; set; }
    public int AccountId { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ConversionRate { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal ValueBefore { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueBeforeCZK { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal TransactionCzk { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueAfter { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueAfterCZK { get; set; }
}
