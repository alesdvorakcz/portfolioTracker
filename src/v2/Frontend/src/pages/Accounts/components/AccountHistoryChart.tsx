import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { Account } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  account: Account;
}

const AccountHistoryChart: React.FC<Props> = ({ account }) => {
  const trades = account.history;

  const data: Serie[] = [
    {
      id: 'value',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.valueAfter,
      })),
    },
    {
      id: 'transactions',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.cumulativeTransactions,
      })),
    },
  ];

  return (
    <LineChart
      data={data}
      height={500}
      yScale
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const value = trades[index].valueAfter;
        const transaction = trades[index].cumulativeTransactions;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem label="Value: " value={toCurrencyFormat(value, account.currencyId)} />
            <ChartTooltipItem
              label="Transactions: "
              value={toCurrencyFormat(transaction, account.currencyId)}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default AccountHistoryChart;
