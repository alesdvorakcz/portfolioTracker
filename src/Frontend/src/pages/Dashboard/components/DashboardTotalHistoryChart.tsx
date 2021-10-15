import { Serie } from '@nivo/line';
import moment from 'moment';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, LineChart } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardTotalHistoryChart: React.FC<Props> = ({ dashboardData }) => {
  const data: Serie[] = [
    {
      id: `values_total`,
      data: dashboardData.allAccountsHistory.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.totalValueCZK,
      })),
    },
    {
      id: `transactions_total`,
      data: dashboardData.allAccountsHistory.map((item) => ({
        x: moment.utc(item.date).format('YYYY-MM-DD'),
        y: item.totalTransactionsCZK,
      })),
    },
  ];

  return (
    <LineChart
      data={data}
      height={500}
      tooltip={({ point }) => {
        const index = parseInt(point.id.split('.')[1], 10);
        const value = dashboardData.allAccountsHistory[index].totalValueCZK;
        const transaction = dashboardData.allAccountsHistory[index].totalTransactionsCZK;

        return (
          <ChartTooltip>
            <ChartTooltipItem label="Date: " value={point.data.xFormatted} />
            <ChartTooltipItem
              label="Value: "
              value={value?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
            <ChartTooltipItem
              label="Transactions: "
              value={transaction?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            />
          </ChartTooltip>
        );
      }}
    />
  );
};

export default DashboardTotalHistoryChart;
