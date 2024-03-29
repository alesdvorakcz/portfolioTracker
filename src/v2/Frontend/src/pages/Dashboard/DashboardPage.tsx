import { Tabs } from 'antd';

import { PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import AccountsStatistics from './components/AccountsStatistics';

const { TabPane } = Tabs;

interface Props {}

const tabPaneStyle = { backgroundColor: '#fff', marginTop: -16, padding: 16 };

const DashboardPage: React.FC<Props> = () => {
  const { tradesData } = useTradesContext();
  const { accountData } = tradesData;
  return (
    <PageWrapper title="Dashboard">
      <h2>Accounts statistics</h2>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Accounts" key="1" style={tabPaneStyle}>
          <AccountsStatistics accountData={accountData} />
        </TabPane>
        <TabPane tab="ETFs" key="2" style={tabPaneStyle}>
          TODO
        </TabPane>
      </Tabs>
      {/* <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Accounts History" key="1" style={tabPaneStyle}>
          <AccountsHistoryChart accountData={accountData} />
        </TabPane>
        <TabPane tab="Total Accounts History" key="2" style={tabPaneStyle}>
          <TotalAccountsHistoryChart accountData={accountData} />
        </TabPane>
        <TabPane tab="Total Accounts Monthly History" key="3" style={tabPaneStyle}>
          <TotalAccountsMonthlyHistoryChart accountData={accountData} />
        </TabPane>
        <TabPane tab="ETFs History" key="4" style={tabPaneStyle}>
          <EtfsHistoryChart etfData={etfData} />
        </TabPane>
        <TabPane tab="Crypto History" key="5" style={tabPaneStyle}>
          <CryptosHistoryChart cryptoData={cryptoData} />
        </TabPane>
        <TabPane tab="Total Crypto History" key="6" style={tabPaneStyle}>
          <TotalCryptosHistoryChart cryptoData={cryptoData} />
        </TabPane>
        <TabPane tab="Total Crypto Monthly History" key="7" style={tabPaneStyle}>
          <TotalCryptosMonthlyHistoryChart cryptoData={cryptoData} />
        </TabPane>
        <TabPane tab="Total Net Worth History" key="8" style={tabPaneStyle}>
          <TotalHistoryChart netWorth={netWorth} />
        </TabPane>
        <TabPane tab="Total Net Worth Monthly History" key="9" style={tabPaneStyle}>
          <TotalMonthlyHistoryChart netWorth={netWorth} />
        </TabPane>
      </Tabs> */}
    </PageWrapper>
  );
};

export default DashboardPage;
