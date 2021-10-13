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
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
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
        curve="linear"
        useMesh={true}
        enableCrosshair={false}
        enableArea={true}
      />
    </div>
  );
};

export default AccountDetailChart;
