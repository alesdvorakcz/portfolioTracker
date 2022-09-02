import { Alert, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, PageWrapper } from '../../components';
import { useTradesContext } from '../../contexts/tradesContext';
import EtfDetailInfo from './components/EtfDetailInfo';
import EtfPortfolioHistoryChart from './components/EtfPortfolioHistoryChart';
import EtfTradesHistoryTable from './components/EtfTradesHistoryTable';
import EtfValueHistoryChart from './components/EtfValueHistoryChart';
import EtfValueHistoryTable from './components/EtfValueHistoryTable';
import { useEtfDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}

const EtfDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tradesData } = useTradesContext();
  const { etfData } = tradesData;

  const query = useEtfDetailQuery(parseInt(id!, 10));

  const etf = query.data;
  const etfWithTrades = etf && etfData.etfs.find((x) => x.id === etf.id);

  return (
    <PageWrapper
      title={query.data?.name || 'Etf Detail'}
      subtitle={query.data?.isin || 'Etf Detail'}
      goBack={() => navigate(-1)}
    >
      <>
        {query.isLoading && <LoadingIndicator inBox />}
        {!query.isLoading && query.error && (
          <Alert message={(query.error as any).message} type="error" />
        )}
        {etf && (
          <>
            {etfWithTrades && <EtfDetailInfo etf={etfWithTrades} />}
            <Tabs defaultActiveKey="1">
              <TabPane tab="Value Table" key="1">
                <EtfValueHistoryTable etf={etf} etfWithTrades={etfWithTrades} />
              </TabPane>
              {etfWithTrades && (
                <TabPane tab="Trades Table" key="2">
                  <EtfTradesHistoryTable etf={etfWithTrades} />
                </TabPane>
              )}
              {etfWithTrades && (
                <TabPane tab="Portfolio Chart" key="3">
                  <EtfPortfolioHistoryChart etf={etfWithTrades} />
                </TabPane>
              )}
              <TabPane tab="Value Chart" key="4">
                <EtfValueHistoryChart etf={etf} etfWithTrades={etfWithTrades} />
              </TabPane>
            </Tabs>
          </>
        )}
      </>
    </PageWrapper>
  );
};

export default EtfDetailPage;
