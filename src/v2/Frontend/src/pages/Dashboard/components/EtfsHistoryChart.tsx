import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { EtfData } from '../../../contexts/tradesContext';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfData: EtfData;
}

const EtfsHistoryChart: React.FC<Props> = ({ etfData }) => {
  const etfs = etfData.etfs.map((etf) => ({
    id: etf.id,
    name: etf.name,
    valueData: etf.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.valueAfterCZK,
    })),
    transactionsData: etf.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.cumulativeTransactionsCZK,
    })),
  }));

  const data = etfs.reduce<Serie[]>((acc, item) => {
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
        const etf = etfs.find((x) => x.id.toString() === point.serieId.toString().split('_')[1]);
        if (!etf) return <div>Error</div>;

        const index = parseInt(point.id.split('.')[1], 10);
        const value = etf.valueData[index].y;
        const transaction = etf.transactionsData[index].y;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="ETF: " value={etf.name} />
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

export default EtfsHistoryChart;
