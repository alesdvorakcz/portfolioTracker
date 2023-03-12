namespace PortfolioTracker.WebApi.Contracts.Result;

public class TradesData
{
    public NetWorth NetWorth { get; set; } = new NetWorth();
    public Business.Models.EtfData EtfData { get; set; } = new Business.Models.EtfData();
    public Business.Models.AccountData AccountData { get; set; } = new Business.Models.AccountData();
    public Business.Models.CryptoData CryptoData { get; set; } = new Business.Models.CryptoData();
    public Business.Models.RealEstateData RealEstateData { get; set; } = new Business.Models.RealEstateData();
}