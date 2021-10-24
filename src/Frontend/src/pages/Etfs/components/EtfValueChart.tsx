import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { Currency, EtfInstrumentDetail } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrumentDetail;
  currency?: Currency;
}

const EtfValueChart: React.FC<Props> = ({ etfInstrument, currency }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: etfInstrument.valueHistory.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.value,
      })),
    },
    // {
    //   id: 'transactions',
    //   data: account.history.map((item) => ({
    //     x: moment.utc(item.date).format('YYYY-MM-DD'),
    //     y: item.cumulativeTransactionsCZK,
    //   })),
    // },
  ];

  return (
    <LineChart
      data={data}
      height={500}
      yScale
      tooltip={({ point }) => (
        <ChartTooltip>
          <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
          <ChartTooltipItem
            label="Value: "
            value={point.data.y?.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: currency?.id,
            })}
          />
          {/* <ChartTooltipItem
            label="Transactions: "
            value={transaction?.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          /> */}
        </ChartTooltip>
      )}
    />
  );
};

export default EtfValueChart;
