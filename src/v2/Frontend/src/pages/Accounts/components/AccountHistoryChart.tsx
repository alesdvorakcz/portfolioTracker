import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { Account } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  account: Account;
  showInCZK: boolean;
}

const AccountHistoryChart: React.FC<Props> = ({ account, showInCZK }) => {
  const trades = account.history;

  const data: Serie[] = [
    {
      id: 'value',
      data: trades.map((item) => ({
        x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
        y: item.valueAfter,
      })),
    },
    {
      id: 'transactions',
      data: trades.map((item) => ({
        x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
        y: item.cumulativeTransactions,
      })),
    },
  ];

  const dataCZK: Serie[] = [
    {
      id: 'value',
      data: trades.map((item) => ({
        x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
        y: item.valueAfterCZK,
      })),
    },
    {
      id: 'transactions',
      data: trades.map((item) => ({
        x: moment.utc(item.dateStart).format('YYYY-MM-DD'),
        y: item.cumulativeTransactionsCZK,
      })),
    },
  ];

  return (
    <LineChart
      data={showInCZK ? dataCZK : data}
      height={500}
      yScale
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const trade = trades[index];

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Value: "
              value={
                showInCZK
                  ? toCurrencyFormat(trade.valueAfterCZK)
                  : toCurrencyFormat(trade.valueAfter, account.currencyId)
              }
            />
            <ChartTooltipItem
              label="Transactions: "
              value={
                showInCZK
                  ? toCurrencyFormat(trade.transactionCZK)
                  : toCurrencyFormat(trade.transaction, account.currencyId)
              }
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default AccountHistoryChart;
