using AutoMapper;

namespace PortfolioTracker.WebApi.Contracts.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Database.Entity.Account, Result.Account>()
            .ForMember(d => d.Date, opt => opt.Ignore())
            .ForMember(d => d.TransactionCzk, opt => opt.Ignore())
            .ForMember(d => d.ValueBefore, opt => opt.Ignore())
            .ForMember(d => d.ValueAfter, opt => opt.Ignore())
            .ForMember(d => d.ValueAfterCZK, opt => opt.Ignore())
            .ForMember(d => d.TransactionsCZKTotal, opt => opt.Ignore())
            .ForMember(d => d.ConversionRate, opt => opt.Ignore());
        CreateMap<Database.Entity.Account, Result.AccountDetail>()
            .ForMember(d => d.Date, opt => opt.Ignore())
            .ForMember(d => d.TransactionCzk, opt => opt.Ignore())
            .ForMember(d => d.ValueBefore, opt => opt.Ignore())
            .ForMember(d => d.ValueAfter, opt => opt.Ignore())
            .ForMember(d => d.ValueAfterCZK, opt => opt.Ignore())
            .ForMember(d => d.ConversionRate, opt => opt.Ignore())
            .ForMember(d => d.TransactionsCZKTotal, opt => opt.Ignore())
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Views.AccountEnhanced, Result.Account>()
            .ForMember(d => d.TransactionsCZKTotal, opt => opt.Ignore());
        CreateMap<Database.Views.AccountEnhanced, Result.AccountDetail>()
            .ForMember(d => d.TransactionsCZKTotal, opt => opt.Ignore())
            .ForMember(d => d.History, opt => opt.Ignore());
        CreateMap<Database.Views.AccountValueHistoryEnhanced, Result.AccountValueHistory>()
            .ForMember(d => d.CumulativeTransactionsCZK, opt => opt.Ignore());

        CreateMap<Database.Entity.Currency, Result.Currency>()
            .ForMember(d => d.Date, opt => opt.Ignore())
            .ForMember(d => d.ConversionRate, opt => opt.Ignore());
        CreateMap<Database.Entity.Currency, Result.CurrencyDetail>()
            .ForMember(d => d.Date, opt => opt.Ignore())
            .ForMember(d => d.ConversionRate, opt => opt.Ignore())
            .ForMember(d => d.History, opt => opt.Ignore());

        CreateMap<Database.Views.CurrencyEnhanced, Result.Currency>();
        CreateMap<Database.Views.CurrencyEnhanced, Result.CurrencyDetail>()
            .ForMember(d => d.History, opt => opt.Ignore());
        CreateMap<Database.Entity.CurrencyValueHistory, Result.CurrencyValueHistory>();

        CreateMap<Database.Entity.EtfInstrument, Result.EtfInstrument>()
            .ForMember(d => d.Value, opt => opt.Ignore())
            .ForMember(d => d.ValueCZK, opt => opt.Ignore())
            .ForMember(d => d.TotalAmount, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactions, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactionsCZK, opt => opt.Ignore());
        CreateMap<Database.Views.EtfInstrumentEnhanced, Result.EtfInstrument>();
        CreateMap<Database.Entity.EtfInstrument, Result.EtfInstrumentDetail>()
            .ForMember(d => d.Value, opt => opt.Ignore())
            .ForMember(d => d.ValueCZK, opt => opt.Ignore())
            .ForMember(d => d.TotalAmount, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactions, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactionsCZK, opt => opt.Ignore())
            .ForMember(d => d.TradeHistory, opt => opt.Ignore())
            .ForMember(d => d.TradeHistoryEnhanced, opt => opt.Ignore())
            .ForMember(d => d.ValueHistory, opt => opt.Ignore());
        CreateMap<Database.Entity.EtfInstrumentValueHistory, Result.EtfInstrumentValueHistory>();
        CreateMap<Database.Entity.EtfTradeHistory, Result.EtfTradeHistory>();
        CreateMap<Database.Views.EtfInstrumentTradeHistoryEnhanced, Result.EtfTradeHistoryEnhanced>()
            .ForMember(d => d.AmountTotal, opt => opt.Ignore())
            .ForMember(d => d.ValueBefore, opt => opt.Ignore())
            .ForMember(d => d.ValueBeforeCZK, opt => opt.Ignore())
            .ForMember(d => d.ValueAfter, opt => opt.Ignore())
            .ForMember(d => d.ValueAfterCZK, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactions, opt => opt.Ignore())
            .ForMember(d => d.CumulativeTransactionsCZK, opt => opt.Ignore());
    }
}