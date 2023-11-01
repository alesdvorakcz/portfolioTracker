import { Alert, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import CryptoPortfolioValueDetail from './components/CryptoPortfolioValueDetail';
import CryptoValueDetail from './components/CryptoValueDetail';
import { useCryptoDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}

const CryptoDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const { tradesData } = useTradesContext();
  const navigate = useNavigate();

  const query = useCryptoDetailQuery(parseInt(id!, 10));

  const crypto = query.data;
  const cryptoHistory = tradesData.cryptoData.cryptoCurrenciesHistory.find(
    (x) => x.id === crypto?.id
  );

  return (
    <PageWrapper
      title={query.data?.name || 'Crypto Detail'}
      subtitle="Crypto Detail"
      goBack={() => navigate(-1)}
    >
      <>
        {query.isLoading && <LoadingIndicator inBox />}
        {!query.isLoading && query.error && (
          <Alert message={(query.error as any).message} type="error" />
        )}
        {crypto && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Crypto Value" key="1">
              <CryptoValueDetail crypto={crypto} />
            </TabPane>
            <TabPane tab="Portfolio" key="2">
              {cryptoHistory && (
                <CryptoPortfolioValueDetail crypto={crypto} history={cryptoHistory} />
              )}
            </TabPane>
          </Tabs>
        )}
      </>
    </PageWrapper>
  );
};

export default CryptoDetailPage;
