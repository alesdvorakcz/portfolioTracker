namespace PortfolioTracker.WebApi.Business.Models;

public class Currency
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public IEnumerable<CurrencyValueHistoryRow> History { get; set; } = Array.Empty<CurrencyValueHistoryRow>();

    public decimal? GetConversionDateFor(DateTime day, bool lastIfInFuture = false, bool closestIfMissing = false)
    {
        var item = History.FirstOrDefault(x => x.Date == day);
        if (item == null)
        {
            if (lastIfInFuture)
            {
                var today = DateTime.Now.Date;
                if (day > today)
                {
                    return History.FirstOrDefault(x => x.Date == today)?.ConversionRate;
                }
            }

            if (closestIfMissing)
            {
                var closest = History.OrderBy(x => Math.Abs((x.Date - day).TotalDays)).FirstOrDefault();
                return closest?.ConversionRate;
            }
        }

        return item?.ConversionRate;
    }
}
