import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CurrencyDetail } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  currency: CurrencyDetail;
}

const CurrencyValueHistoryChart: React.FC<Props> = ({ currency }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: currency.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.conversionRate,
      })),
    },
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
            label="Conversion Rate: "
            value={toCurrencyFormat(point.data.y, currency.id)}
          />
        </ChartTooltip>
      )}
    />
  );
};

export default CurrencyValueHistoryChart;
