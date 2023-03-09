import { Tabs } from 'antd';

import { PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import AccountsHistoryChart from './components/AccountsHistoryChart';
import CryptosHistoryChart from './components/CryptosHistoryChart';
import EtfsHistoryChart from './components/EtfsHistoryChart';

const { TabPane } = Tabs;

interface Props {}

const tabPaneStyle = { backgroundColor: '#fff', marginTop: -16, padding: 16 };

const DashboardPage: React.FC<Props> = () => {
  const { tradesData } = useTradesContext();
  const { accountData, etfData, cryptoData } = tradesData;
  return (
    <PageWrapper title="Dashboard">
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Accounts History" key="1" style={tabPaneStyle}>
          <AccountsHistoryChart accountData={accountData} />
        </TabPane>
        <TabPane tab="ETFs History" key="2" style={tabPaneStyle}>
          <EtfsHistoryChart etfData={etfData} />
        </TabPane>
        <TabPane tab="Crypto History" key="3" style={tabPaneStyle}>
          <CryptosHistoryChart cryptoData={cryptoData} />
        </TabPane>
      </Tabs>
    </PageWrapper>
  );
};

export default DashboardPage;
