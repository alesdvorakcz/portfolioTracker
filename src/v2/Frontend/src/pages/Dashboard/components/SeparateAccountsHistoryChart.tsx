import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { AccountData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  accountData: AccountData;
}

const SeparateAccountsHistoryChart: React.FC<Props> = ({ accountData }) => {
  const accounts = accountData.accounts.map((account) => ({
    id: account.id,
    name: account.name,
    valueData: account.history.map((item) => ({
      x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
      y: item.valueAfterCZK,
    })),
    transactionsData: account.history.map((item) => ({
      x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
      y: item.cumulativeTransactionsCZK,
    })),
  }));

  const data = accounts.reduce<Serie[]>((acc, item) => {
    return [
      ...acc,
      { id: `values_${item.id}`, data: item.valueData },
      { id: `transactions_${item.id}`, data: item.transactionsData },
    ];
  }, []);

  return (
    <LineChart
      data={data}
      height={500}
      tooltip={({ point }) => {
        const account = accounts.find(
          (x) => x.id.toString() === point.serieId.toString().split('_')[1]
        );
        if (!account) return <div>Error</div>;

        const index = parseInt(point.id.split('.')[1], 10);
        const value = account.valueData[index].y;
        const transaction = account.transactionsData[index].y;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Account: " value={account.name} />
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Value: "
              value={value?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
            <ChartTooltipItem
              label="Transactions: "
              value={transaction?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default SeparateAccountsHistoryChart;
