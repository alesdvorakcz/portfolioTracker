import { Button, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router';

import { PageWrapper, QueryWrapper } from '../../components';
import CryptoWalletDetailChart from './components/CryptoWalletDetailChart';
import CryptoWalletInfo from './components/CryptoWalletInfo';
import CryptoWalletTradesTable from './components/CryptoWalletTradesTable';
import { useCryptoWalletDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}
interface PageParams {
  id: string;
}

const CryptoWalletDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();

  const id = parseInt(params.id, 10);

  const query = useCryptoWalletDetailQuery(id);

  return (
    <PageWrapper
      title="Crypto Wallet Detail"
      extra={<Button type="primary">History Import</Button>}
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(wallet) => (
          <>
            <CryptoWalletInfo wallet={wallet} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoWalletTradesTable
                  wallet={wallet}
                  // onAddClick={currencyValueHistoryAdd.open}
                  // onEditClick={currencyValueHistoryEdit.open}
                />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CryptoWalletDetailChart wallet={wallet} />
              </TabPane>
            </Tabs>
          </>
        )}
      />
    </PageWrapper>
  );
};

export default CryptoWalletDetailPage;
