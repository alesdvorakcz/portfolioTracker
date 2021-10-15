import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { AccountDetail, Currency } from '../../../api/models';
import { LineChart } from '../../../components';

interface Props {
  account: AccountDetail;
  currency?: Currency;
}

const AccountDetailChart: React.FC<Props> = ({ account }) => {
  const data: Serie[] = [
    {
      id: 'value',
      data: account.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.valueAfterCZK,
      })),
    },
    {
      id: 'transactions',
      data: account.history.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.cumulativeTransactionsCZK,
      })),
    },
  ];

  return <LineChart data={data} height={500} />;
};

export default AccountDetailChart;
