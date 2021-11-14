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
      id: 'value',
      data: cryptoCurrency.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.converstionRateEUR,
      })),
    },
  ];

  return <LineChart data={data} height={500} yScale />;
};

export default CryptoCurrencyDetailChart;
