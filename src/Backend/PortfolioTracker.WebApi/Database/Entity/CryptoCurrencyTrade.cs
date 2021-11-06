using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class CryptoCurrencyTrade
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,4)")]
    public decimal ChangeEUR { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal Change { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal AmountAfter { get; set; }

    public int WalletId { get; set; }
    public CryptoCurrencyWallet Wallet { get; set; } = null!;
}
