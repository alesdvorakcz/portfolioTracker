import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { AccountData, NetWorthHistoryAggregated } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  accountData: AccountData;
  timeRange: string;
}

const AccountsHistoryChart: React.FC<Props> = ({ accountData, timeRange }) => {
  let trades: NetWorthHistoryAggregated[] = [];
  if (timeRange === 'Yearly') {
    trades = accountData.yearlyHistory;
  } else if (timeRange === 'Monthly') {
    trades = accountData.monthlyHistory;
  } else {
    trades = accountData.history;
  }

  const data: Serie[] = [
    {
      id: 'val',
      data: trades.map((x) => ({
        x: moment.utc(x.dateStart).format('YYYY-MM-DD'),
        y: x.valueAfterCZK,
      })),
    },
    {
      id: 'transactions',
      data: trades.map((x) => ({
        x: moment.utc(x.dateStart).format('YYYY-MM-DD'),
        y: x.cumulativeTransactionsCZK,
      })),
    },
  ];

  return (
    <LineChart
      data={data}
      height={500}
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const value = trades[index].valueAfterCZK;
        const transaction = trades[index].cumulativeTransactionsCZK;

        return (
          <ChartTooltip>
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

export default AccountsHistoryChart;
