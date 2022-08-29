import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { EtfDetail } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  etf: EtfDetail;
}

const EtfValueHistoryChart: React.FC<Props> = ({ etf }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: etf.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.value,
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
            label="Value: "
            value={toCurrencyFormat(point.data.y, etf.currencyId)}
          />
        </ChartTooltip>
      )}
    />
  );
};

export default EtfValueHistoryChart;
