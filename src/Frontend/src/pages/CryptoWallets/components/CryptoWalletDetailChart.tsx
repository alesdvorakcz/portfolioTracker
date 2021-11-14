import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { CryptoCurrencyWalletDetail } from '../../../api/models';
import { LineChart } from '../../../components';

interface Props {
  wallet: CryptoCurrencyWalletDetail;
}

const CryptoWalletDetailChart: React.FC<Props> = ({ wallet }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: wallet.trades.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.amountAfter,
      })),
    },
  ];

  return <LineChart data={data} height={500} yScale />;
};

export default CryptoWalletDetailChart;
