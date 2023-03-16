import { Segmented, Select } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, FlexRow, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import AccountDetailInfo from './components/AccountDetailInfo';
import AccountHistoryChart from './components/AccountHistoryChart';
import AccountHistoryTable from './components/AccountHistoryTable';
import AccountMonthlyHistoryTable from './components/AccountMonthlyHistoryTable';
import AccountYearlyHistoryTable from './components/AccountMonthlyYearlyTable';

interface Props {}

const AccountDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tradesData } = useTradesContext();
  const { accountData } = tradesData;

  const account = accountData.accounts.find((x) => x.id === id);

  const currencies =
    account && account.currencyId !== 'CZK' ? [account.currencyId, 'CZK'] : ['CZK'];
  const [showInCZK, setShowInCZK] = useState<boolean>(false);

  const timeRanges = ['Yearly', 'Monthly', 'All Data'];
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(timeRanges[0]);

  const views = [
    { value: 'table', label: 'Table' },
    { value: 'line-chart', label: 'Line Chart' },
  ];
  const [selectedView, setSelectedView] = useState<string>(views[0].value);

  return (
    <PageWrapper
      title={account?.name || 'Account Detail'}
      subtitle={account?.id || 'Account Detail'}
      goBack={() => navigate(-1)}
      extra={
        <Segmented
          options={currencies}
          value={showInCZK ? 'CZK' : account?.currencyId}
          onChange={(val) => setShowInCZK(val === 'CZK')}
        />
      }
    >
      <>
        {account && (
          <>
            <AccountDetailInfo account={account} showInCZK={showInCZK} />
            <Box>
              <FlexRow marginBottom>
                <Segmented
                  options={timeRanges}
                  value={selectedTimeRange}
                  onChange={(val) => setSelectedTimeRange(val.toString())}
                />
                <Select
                  style={{ width: 120 }}
                  options={views}
                  value={selectedView}
                  onChange={(x) => setSelectedView(x)}
                />
              </FlexRow>
              {selectedView === 'table' && (
                <>
                  {selectedTimeRange === 'Yearly' && (
                    <AccountYearlyHistoryTable account={account} showInCZK={showInCZK} />
                  )}
                  {selectedTimeRange === 'Monthly' && (
                    <AccountMonthlyHistoryTable account={account} showInCZK={showInCZK} />
                  )}
                  {selectedTimeRange === 'All Data' && (
                    <AccountHistoryTable account={account} showInCZK={showInCZK} />
                  )}
                </>
              )}
              {selectedView === 'line-chart' && (
                <AccountHistoryChart account={account} showInCZK={showInCZK} />
              )}
            </Box>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default AccountDetailPage;
