using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class AccountValueHistory
{
    public int Id { get; set; }
    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal ValueBefore { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal TransactionCzk { get; set; }

    public int AccountId { get; set; }
    public Account Account { get; set; } = null!;
}
