import { Alert, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, PageWrapper } from '../../components';
import CryptoValueHistoryChart from './components/CryptoValueHistoryChart';
import CryptoValueHistoryTable from './components/CryptoValueHistoryTable';
import { useCryptoDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}

const CryptoDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useCryptoDetailQuery(parseInt(id!, 10));

  const crypto = query.data;

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
            <TabPane tab="Table" key="1">
              <CryptoValueHistoryTable crypto={crypto} />
            </TabPane>
            <TabPane tab="Chart" key="2">
              <CryptoValueHistoryChart crypto={crypto} />
            </TabPane>
          </Tabs>
        )}
      </>
    </PageWrapper>
  );
};

export default CryptoDetailPage;
