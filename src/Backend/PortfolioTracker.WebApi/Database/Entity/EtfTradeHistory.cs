using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class EtfTradeHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public int Amount { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal UnitPrice { get; set; }

    public int EtfInstrumentId { get; set; }
    public EtfInstrument EtfInstrument { get; set; } = null!;
}
