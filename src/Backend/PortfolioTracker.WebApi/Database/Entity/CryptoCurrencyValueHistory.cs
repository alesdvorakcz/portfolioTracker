using System.ComponentModel.DataAnnotations.Schema;

namespace PortfolioTracker.WebApi.Database.Entity;

public class CryptoCurrencyValueHistory
{
    public int Id { get; set; }

    public DateTime Date { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal ConversionRateUSD { get; set; }

    [Column(TypeName = "decimal(18,8)")]
    public decimal ConversionRateEUR { get; set; }

    public string CryptoCurrencyId { get; set; } = string.Empty;
    public CryptoCurrency CryptoCurrency { get; set; } = null!;
}
