import { ResponsiveLine, Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardHistoryChart: React.FC<Props> = ({ dashboardData }) => {
  const accounts = dashboardData.accounts.map((account) => ({
    id: account.id,
    name: account.name,
    valueData: account.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.valueAfterCZK,
    })),
    transactionsData: account.history.map((item) => ({
      x: moment.utc(item.date).format('YYYY-MM-DD'),
      y: item.cumulativeTransactionsCZK,
    })),
  }));

  const data = accounts.reduce<Serie[]>((acc, item) => {
    return [
      ...acc,
      { id: `values_${item.id}`, data: item.valueData },
      { id: `transactions_${item.id}`, data: item.transactionsData },
    ];
  }, []);

  //TODO: legend, better popups, colors, ...

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
        tooltip={({ point }) => {
          const account = accounts.find(
            (x) => x.id.toString() === point.serieId.toString().split('_')[1]
          );
          if (!account) return <div>Error</div>;

          const index = parseInt(point.id.split('.')[1], 10);
          const value = account.valueData[index].y;
          const transaction = account.transactionsData[index].y;

          return (
            <div style={{ backgroundColor: '#fff', padding: 5 }}>
              <div>
                <span style={{ marginRight: 5 }}>Account:</span>
                <span style={{ fontWeight: 'bold' }}>{account.name}</span>
              </div>
              <div>
                <span style={{ marginRight: 5 }}>Date:</span>
                <span style={{ fontWeight: 'bold' }}>{point.data.xFormatted}</span>
              </div>
              <div>
                <span style={{ marginRight: 5 }}>Value:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {value?.toLocaleString(DEFAULT_LOCALE, {
                    style: 'currency',
                    currency: DEFAULT_CURRENCY,
                  })}
                </span>
              </div>
              <div>
                <span style={{ marginRight: 5 }}>Transactions:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {transaction?.toLocaleString(DEFAULT_LOCALE, {
                    style: 'currency',
                    currency: DEFAULT_CURRENCY,
                  })}
                </span>
              </div>
            </div>
          );
        }}
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

export default DashboardHistoryChart;
