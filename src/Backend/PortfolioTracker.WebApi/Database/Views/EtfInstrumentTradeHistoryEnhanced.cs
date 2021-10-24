using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Views;

public class EtfInstrumentTradeHistoryEnhanced
{
    public int Id { get; set; }
    public int EtfInstrumentId { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string CurrencyId { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,4)")]
    public decimal? ConversionRate { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal UnitPrice { get; set; }
    public int AmountChange { get; set; }
}
