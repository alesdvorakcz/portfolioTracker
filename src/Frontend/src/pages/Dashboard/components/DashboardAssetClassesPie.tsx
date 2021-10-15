import { ResponsivePie } from '@nivo/pie';
import React from 'react';

import { GetDataForDashboardResult } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  dashboardData: GetDataForDashboardResult;
}

const DashboardAssedClassesPie: React.FC<Props> = ({ dashboardData }) => {
  const categories = dashboardData.accounts.reduce<any[]>((result, account) => {
    const asset = result.find((x) => x.id === account.category);
    if (asset) {
      asset.totalValueCZK += account.totalValueCZK;
      asset.totalTransactionsCZK += account.totalTransactionsCZK;
      return result;
    }
    return [
      ...result,
      {
        id: account.category,
        totalValueCZK: account.totalValueCZK,
        totalTransactionsCZK: account.totalTransactionsCZK,
      },
    ];
  }, []);

  //TODO: make this more pretty

  const data = categories.map((category) => ({
    id: category.id,
    label: category.id,
    value: dashboardData.totalValueCZK
      ? category.totalValueCZK / dashboardData.totalValueCZK
      : category.totalValueCZK,
    valueTotal: category.totalValueCZK,
  }));

  return (
    <div style={{ height: 500 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        innerRadius={0.15}
        padAngle={2}
        cornerRadius={10}
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
        arcLabel="label"
        arcLabelsRadiusOffset={0.75}
        arcLinkLabel="formattedValue"
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        valueFormat=" ^-.1%"
      />
    </div>
  );
};

export default DashboardAssedClassesPie;
