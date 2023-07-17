import { Segmented, Select } from 'antd';
import { useState } from 'react';

import { FlexRow } from '../../../components';
import { AccountData } from '../../../contexts/tradesContext';
import AccountsHistoryChart from './AccountsHistoryChart';
import AccountsHistoryTable from './AccountsHistoryTable';
import SeparateAccountsHistoryChart from './SeparateAccountsHistoryChart';

interface Props {
  accountData: AccountData;
}

const AccountsStatistics = (props: Props) => {
  const views = [
    { value: 'line-chart', label: 'Line Chart' },
    { value: 'table', label: 'Table' },
    { value: 'line-chart-separate', label: 'Line Chart (Separated)' },
  ];
  const [selectedView, setSelectedView] = useState<string>(views[0].value);

  const timeRanges = ['Yearly', 'Monthly', 'All Data'];
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(timeRanges[0]);

  return (
    <div>
      <FlexRow align="left" marginBottom>
        <Select
          style={{ width: 120, marginRight: 10 }}
          options={views}
          value={selectedView}
          onChange={(x) => setSelectedView(x)}
        />
        {selectedTimeRange !== 'line-chart-separate' && (
          <Segmented
            options={timeRanges}
            value={selectedTimeRange}
            onChange={(val) => setSelectedTimeRange(val.toString())}
          />
        )}
      </FlexRow>
      {selectedView === 'line-chart' && (
        <AccountsHistoryChart accountData={props.accountData} timeRange={selectedTimeRange} />
      )}
      {selectedView === 'table' && (
        <AccountsHistoryTable accountData={props.accountData} timeRange={selectedTimeRange} />
      )}
      {selectedView === 'line-chart-separate' && (
        <SeparateAccountsHistoryChart accountData={props.accountData} />
      )}
    </div>
  );
};

export default AccountsStatistics;
