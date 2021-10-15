import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { LineChart } from '../../../components';
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

  return (
    <LineChart
      data={data}
      height={500}
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
    />
  );
};

export default DashboardHistoryChart;
