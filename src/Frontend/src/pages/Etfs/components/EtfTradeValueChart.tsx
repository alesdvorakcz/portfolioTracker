import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { Currency, EtfInstrumentDetail } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
}

const EtfTradeValueChart: React.FC<Props> = ({ etfInstrument, currency }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: etfInstrument.tradeHistoryEnhanced.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.valueAfter,
      })),
    },
    {
      id: 'transactions',
      data: etfInstrument.tradeHistoryEnhanced.map((item) => ({
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
        const value = etfInstrument.tradeHistoryEnhanced[index].valueAfter;
        const transaction = etfInstrument.tradeHistoryEnhanced[index].cumulativeTransactions;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Value: "
              value={value.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: currency?.id ?? DEFAULT_CURRENCY,
              })}
            />
            <ChartTooltipItem
              label="Transactions: "
              value={transaction?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: currency?.id ?? DEFAULT_CURRENCY,
              })}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default EtfTradeValueChart;
