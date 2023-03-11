namespace PortfolioTracker.WebApi.Contracts.Result;

public class TradesData
{
    public NetWorth NetWorth { get; set; } = new NetWorth();
    public Business.Models.EtfData EtfData { get; set; } = new Business.Models.EtfData();
    public Business.Models.AccountData AccountData { get; set; } = new Business.Models.AccountData();
    public CryptoData CryptoData { get; set; } = new CryptoData();
    public RealEstateData RealEstateData { get; set; } = new RealEstateData();
}