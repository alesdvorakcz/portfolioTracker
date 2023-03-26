import moment from 'moment';
import React from 'react';

import { Account } from '../../../api/models';
import { BarChart, ChartTooltip, ChartTooltipItem } from '../../../components';
import { DEFAULT_CURRENCY, toCurrencyFormat } from '../../../i18n';

interface Props {
  account: Account;
  showInCZK: boolean;
  timeRange: string;
}

const getTrades = (account: Account, timeRange: string) => {
  if (timeRange === 'Yearly') return account.yearlyHistory;

  return account.monthlyHistory.filter((x) => x.profit !== 0 || x.transaction !== 0).slice(-24);
};

const AccountHistoryProfitChart: React.FC<Props> = ({ account, showInCZK, timeRange }) => {
  const dateFormat = timeRange === 'Yearly' ? 'YYYY' : 'MM. YYYY';
  const dateLabel = timeRange === 'Yearly' ? 'Year:' : 'Month: ';

  const data = getTrades(account, timeRange)
    .sort((a, b) => (a.dateStart > b.dateStart ? 1 : -1))
    .map((item) => ({
      x: moment.utc(item.dateStart).format(dateFormat),
      profit: showInCZK ? item.profitCZK : item.profit,
      transactions: showInCZK ? item.transactionCZK : item.transaction,
    }));

  return (
    <BarChart
      keys={['profit', 'transactions']}
      indexBy="x"
      data={data}
      key={`${timeRange}-${showInCZK}-${data.length}`}
      height={500}
      valueFormat={(val) =>
        toCurrencyFormat(val, showInCZK ? DEFAULT_CURRENCY : account.currencyId)!
      }
      tooltip={(val) => {
        const profit = val.data.profit;
        const transactions = val.data.transactions;

        return (
          <ChartTooltip>
            <ChartTooltipItem label={dateLabel} value={val.indexValue} />
            <ChartTooltipItem
              label="Profit: "
              value={toCurrencyFormat(
                profit ?? 0,
                showInCZK ? DEFAULT_CURRENCY : account.currencyId
              )}
            />
            <ChartTooltipItem
              label="Transactions: "
              value={toCurrencyFormat(
                transactions ?? 0,
                showInCZK ? DEFAULT_CURRENCY : account.currencyId
              )}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default AccountHistoryProfitChart;
