using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class EtfValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal Value { get; set; }

    public int EtfId { get; set; }
    public Etf Etf { get; set; } = null!;
}
