import { ResponsiveLine, Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { AccountDetail, Currency } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  account: AccountDetail;
  currency?: Currency;
}

const AccountDetailChart: React.FC<Props> = ({ account, currency }) => {
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

  return (
    <div style={{ height: 500 }}>
      <ResponsiveLine
        data={data}
        colors={[
          'rgba(87,117,144, 1)',
          'rgba(87,117,144, .6)',
          'rgba(249,65,68, 1)',
          'rgba(249,65,68, .6)',
          'rgba(243,114,44, 1)',
          'rgba(243,114,44, .6)',
          'rgba(67,170,139, 1)',
          'rgba(67,170,139, .6)',
          'rgba(248,150,30, 1)',
          'rgba(248,150,30, .6)',
          'rgba(144,190,109, 1)',
          'rgba(144,190,109, .6)',
          'rgba(249,199,79, 1)',
          'rgba(249,199,79, .6)',
        ]}
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
        enableGridX={false}
        xFormat="time:%d.%m.%Y"
        yFormat={(x) =>
          x.toLocaleString(DEFAULT_LOCALE, {
            style: 'currency',
            currency: DEFAULT_CURRENCY,
          })
        }
        // yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisBottom={{
          format: '%b %y',
        }}
        axisLeft={{
          format: (d: number) => {
            return d?.toLocaleString(DEFAULT_LOCALE);
          },
        }}
        curve="linear"
        useMesh={true}
        enableCrosshair={false}
        enableArea={true}
      />
    </div>
  );
};

export default AccountDetailChart;
