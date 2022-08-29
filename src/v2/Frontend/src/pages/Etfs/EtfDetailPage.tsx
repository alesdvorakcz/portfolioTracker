import { Alert, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, PageWrapper } from '../../components';
import EtfValueHistoryChart from './components/EtfValueHistoryChart';
import EtfValueHistoryTable from './components/EtfValueHistoryTable';
import { useEtfDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}

const EtfDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useEtfDetailQuery(parseInt(id!, 10));

  const etf = query.data;

  return (
    <PageWrapper
      title={query.data?.name || 'Etf Detail'}
      subtitle="Etf Detail"
      goBack={() => navigate(-1)}
    >
      <>
        {query.isLoading && <LoadingIndicator inBox />}
        {!query.isLoading && query.error && (
          <Alert message={(query.error as any).message} type="error" />
        )}
        {etf && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Table" key="1">
              <EtfValueHistoryTable etf={etf} />
            </TabPane>
            <TabPane tab="Chart" key="2">
              <EtfValueHistoryChart etf={etf} />
            </TabPane>
          </Tabs>
        )}
      </>
    </PageWrapper>
  );
};

export default EtfDetailPage;
