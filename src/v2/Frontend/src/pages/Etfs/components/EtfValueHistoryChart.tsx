import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { EtfDetail, EtfDetailWithTrades } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  etfWithTrades?: EtfDetailWithTrades;
  etf: EtfDetail;
}

const getData = (etf: EtfDetail, etfWithTrades?: EtfDetailWithTrades) => {
  if (etfWithTrades) {
    const limit = moment().add(-2, 'year'); //TODO: make this dynamic
    var history = etfWithTrades.history.filter((x) => moment.utc(x.date).isAfter(limit));

    const data: Serie[] = [
      {
        id: 'unitPrice',
        data: history.map((item) => ({
          x: moment.utc(item.date).format('YYYY-MM-DD'),
          y: item.unitPrice,
        })),
      },
    ];

    return data;
  }

  const limit = moment().add(-2, 'year'); //TODO: make this dynamic
  var history2 = etf.history.filter((x) => moment.utc(x.date).isAfter(limit));

  const data: Serie[] = [
    {
      id: 'value',
      data: history2.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.value,
      })),
    },
  ];

  return data;
};

const EtfValueHistoryChart: React.FC<Props> = ({ etf, etfWithTrades }) => {
  const data = getData(etf, etfWithTrades);

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
