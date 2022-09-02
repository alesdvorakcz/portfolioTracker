import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CryptoDetail } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  crypto: CryptoDetail;
}

const CryptoValueHistoryChart: React.FC<Props> = ({ crypto }) => {
  const limit = moment().add(-2, 'year'); //TODO: make this dynamic
  var history = crypto.history.filter((x) => moment.utc(x.date).isAfter(limit));

  const data: Serie[] = [
    {
      id: 'value',
      data: history.map((item) => ({
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
            value={toCurrencyFormat(point.data.y, crypto.currencyId)}
          />
        </ChartTooltip>
      )}
    />
  );
};

export default CryptoValueHistoryChart;
