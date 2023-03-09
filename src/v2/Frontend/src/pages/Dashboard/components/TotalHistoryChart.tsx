import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { NetWorth } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  netWorth: NetWorth;
}

const TotalHistoryChart: React.FC<Props> = ({ netWorth }) => {
  const data: Serie[] = [
    {
      id: 'val',
      data: netWorth.history.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.valueCZK,
      })),
    },
    {
      id: 'transactions',
      data: netWorth.history.map((x) => ({
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
        const value = netWorth.history[index].valueCZK;
        const transaction = netWorth.history[index].transactionsCZK;

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

export default TotalHistoryChart;
