import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CryptoCurrencyDetail } from '../../../api/models';
import { LineChart } from '../../../components';

interface Props {
  cryptoCurrency: CryptoCurrencyDetail;
}

const CryptoCurrencyDetailChart: React.FC<Props> = ({ cryptoCurrency }) => {
  const data: Serie[] = [
    {
      id: 'valueEUR',
      data: cryptoCurrency.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.conversionRateEUR,
      })),
    },
    {
      id: 'valueUSD',
      data: cryptoCurrency.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.conversionRateUSD,
      })),
    },
  ];

  return <LineChart data={data} height={500} yScale />;
};

export default CryptoCurrencyDetailChart;
