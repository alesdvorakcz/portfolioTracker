import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { PieChart } from '../../../components';
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
        <div style={{ backgroundColor: '#fff', padding: 5 }}>
          <div>
            <span style={{ marginRight: 10 }}>{p.datum.label}:</span>
            <span style={{ fontWeight: 'bold' }}>{p.datum.formattedValue}</span>
          </div>
          <div style={{ fontWeight: 'bold' }}>
            {p.datum.data.valueTotal?.toLocaleString(DEFAULT_LOCALE, {
              style: 'currency',
              currency: DEFAULT_CURRENCY,
            })}
          </div>
        </div>
      )}
    />
  );
};

export default DashboardAccountsPie;
