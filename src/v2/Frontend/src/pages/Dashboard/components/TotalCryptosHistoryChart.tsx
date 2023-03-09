import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { CryptoData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  cryptoData: CryptoData;
}

const TotalCryptosHistoryChart: React.FC<Props> = ({ cryptoData }) => {
  const data: Serie[] = [
    {
      id: 'val',
      data: cryptoData.history.map((x) => ({
        x: moment.utc(x.date).format('YYYY-MM-DD'),
        y: x.valueCZK,
      })),
    },
    {
      id: 'transactions',
      data: cryptoData.history.map((x) => ({
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
        const value = cryptoData.history[index].valueCZK;
        const transaction = cryptoData.history[index].transactionsCZK;

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

export default TotalCryptosHistoryChart;
