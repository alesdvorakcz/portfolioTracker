import { Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import AccountDetailInfo from './components/AccountDetailInfo';
import AccountHistoryChart from './components/AccountHistoryChart';
import AccountHistoryTable from './components/AccountHistoryTable';

const { TabPane } = Tabs;

interface Props {}

const AccountDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tradesData } = useTradesContext();
  const { accountData } = tradesData;

  const account = accountData.accounts.find((x) => x.id === id);

  return (
    <PageWrapper
      title={account?.name || 'Account Detail'}
      subtitle={account?.id || 'Account Detail'}
      goBack={() => navigate(-1)}
    >
      <>
        {account && (
          <>
            <AccountDetailInfo account={account} />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <AccountHistoryTable account={account} />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <AccountHistoryChart account={account} />
              </TabPane>
            </Tabs>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default AccountDetailPage;
