import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { ChartTooltip, ChartTooltipItem, PieChart } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardAccountsPie: React.FC<Props> = ({ dashboardData }) => {
  const data = dashboardData.accounts.map((account) => {
    return {
      id: account.id,
      label: account.name,
      valueTotal: account.totalValueCZK,
      value:
        dashboardData.totalValueCZK && account.totalValueCZK
          ? account.totalValueCZK / dashboardData.totalValueCZK
          : account.totalValueCZK,
    };
  });
  return (
    <PieChart
      data={data}
      height={500}
      tooltip={(p) => (
        <ChartTooltip>
          <ChartTooltipItem label={p.datum.label.toString()} value={p.datum.formattedValue} />
          <ChartTooltipItem
            value={p.datum.data.valueTotal?.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          />
        </ChartTooltip>
      )}
    />
  );
};

export default DashboardAccountsPie;
