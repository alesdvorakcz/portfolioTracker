using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class CryptoValueHistory
{

    public int Id { get; set; }
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal Value { get; set; }

    public int CryptoId { get; set; }
    public Crypto Crypto { get; set; } = null!;
}
