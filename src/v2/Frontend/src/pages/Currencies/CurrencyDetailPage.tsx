import { Alert, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingIndicator, PageWrapper } from '../../components';
import CurrencyValueHistoryChart from './components/CurrencyValueHistoryChart';
import CurrencyValueHistoryTable from './components/CurrencyValueHistoryTable';
import { useCurrencyDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}

const CurrencyDetailPage: React.FC<Props> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const query = useCurrencyDetailQuery(id!);

  const currency = query.data;

  return (
    <PageWrapper
      title={query.data?.name || 'Currency Detail'}
      subtitle="Currency Detail"
      goBack={() => navigate(-1)}
    >
      <>
        {query.isLoading && <LoadingIndicator inBox />}
        {!query.isLoading && query.error && (
          <Alert message={(query.error as any).message} type="error" />
        )}
        {currency && (
          <Tabs defaultActiveKey="1">
            <TabPane tab="Table" key="1">
              <CurrencyValueHistoryTable currency={currency} />
            </TabPane>
            <TabPane tab="Chart" key="2">
              <CurrencyValueHistoryChart currency={currency} />
            </TabPane>
          </Tabs>
        )}
      </>
    </PageWrapper>
  );
};

export default CurrencyDetailPage;
