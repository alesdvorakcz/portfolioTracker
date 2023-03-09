import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { AccountData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  accountData: AccountData;
}

const TotalAccountsHistoryChart: React.FC<Props> = ({ accountData }) => {
  const data: Serie[] = [
    {
      id: 'val',
      data: accountData.history.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.valueCZK,
      })),
    },
    {
      id: 'transactions',
      data: accountData.history.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.transactionsCZK,
      })),
    },
  ];

  return (
    <LineChart
      data={data}
      height={500}
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const value = accountData.history[index].valueCZK;
        const transaction = accountData.history[index].transactionsCZK;

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

export default TotalAccountsHistoryChart;
