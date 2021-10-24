using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Views;

public class EtfInstrumentEnhanced
{
    public int Id { get; set; }

    public string Slug { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Isin { get; set; } = string.Empty;

    public string CurrencyId { get; set; } = string.Empty;

    public DateTime? Date { get; set; }
    public int TotalAmount { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal CumulativeTransactions { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? CumulativeTransactionsCZK { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? UnitPrice { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ConversionRate { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal Value { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ValueCZK { get; set; }
}
