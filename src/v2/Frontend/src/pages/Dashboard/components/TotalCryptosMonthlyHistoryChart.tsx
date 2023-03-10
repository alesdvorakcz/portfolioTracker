import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { CryptoData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  cryptoData: CryptoData;
}

const TotalCryptosMonthlyHistoryChart: React.FC<Props> = ({ cryptoData }) => {
  const data: Serie[] = [
    {
      id: 'val',
      data: cryptoData.monthlyHistory.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.valueCZK,
      })),
    },
    {
      id: 'transactions',
      data: cryptoData.monthlyHistory.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.transactionsCZK,
      })),
    },
  ];

  return (
    <LineChart
      data={data}
      xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'month' }}
      xFormat={'time:%m.%Y'}
      height={500}
      axisBottom={{
        format: '%m/%Y',
        tickValues: 'every 3 months',
      }}
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const value = cryptoData.monthlyHistory[index].valueCZK;
        const transaction = cryptoData.monthlyHistory[index].transactionsCZK;

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

export default TotalCryptosMonthlyHistoryChart;
