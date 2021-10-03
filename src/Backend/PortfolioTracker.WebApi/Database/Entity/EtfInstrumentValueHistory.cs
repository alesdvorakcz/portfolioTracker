using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class EtfInstrumentValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal Value { get; set; }

    public int EtfInstrumentId { get; set; }
    public EtfInstrument EtfInstrument { get; set; } = null!;
}
