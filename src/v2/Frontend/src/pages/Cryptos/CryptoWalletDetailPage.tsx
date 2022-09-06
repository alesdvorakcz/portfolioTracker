import { Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import CryptoWalletDetailInfo from './components/CryptoWalletDetailInfo';
import CryptoWalletHistoryChart from './components/CryptoWalletHistoryChart';
import CryptoWalletHistoryTable from './components/CryptoWalletHistoryTable';

const { TabPane } = Tabs;

interface Props {}

const CryptoWalletDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tradesData } = useTradesContext();
  const { cryptoData } = tradesData;

  const wallet = cryptoData.cryptoWallets.find((x) => x.id === id);

  return (
    <PageWrapper
      title={wallet?.name || 'Wallet Detail'}
      subtitle={wallet?.crypto.name || 'Wallet Detail'}
      goBack={() => navigate(-1)}
    >
      <>
        {wallet && (
          <>
            <CryptoWalletDetailInfo wallet={wallet} />
            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoWalletHistoryTable wallet={wallet} />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CryptoWalletHistoryChart wallet={wallet} />
              </TabPane>
            </Tabs>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default CryptoWalletDetailPage;
