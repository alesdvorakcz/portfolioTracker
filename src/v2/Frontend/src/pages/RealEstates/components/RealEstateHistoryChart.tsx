import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { RealEstate } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  realEstate: RealEstate;
}

const RealEstateHistoryChart: React.FC<Props> = ({ realEstate }) => {
  const trades = realEstate.history;

  const data: Serie[] = [
    {
      id: 'totalValueIncludingIncome',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.totalValueIncludingIncome,
      })),
    },
    {
      id: 'ownValue',
      data: trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.ownValue,
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
        const totalValueIncludingIncome = trades[index].totalValueIncludingIncome;
        const ownValue = trades[index].ownValue;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Total Value: "
              value={toCurrencyFormat(totalValueIncludingIncome)}
            />
            <ChartTooltipItem label="Own Value: " value={toCurrencyFormat(ownValue)} />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default RealEstateHistoryChart;
