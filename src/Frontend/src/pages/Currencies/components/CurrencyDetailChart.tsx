import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CurrencyDetail } from '../../../api/models';
import { LineChart } from '../../../components';

interface Props {
  currency: CurrencyDetail;
}

const CurrencyDetailChart: React.FC<Props> = ({ currency }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: currency.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.conversionRate,
      })),
    },
  ];

  return <LineChart data={data} height={500} yScale />;
};

export default CurrencyDetailChart;
