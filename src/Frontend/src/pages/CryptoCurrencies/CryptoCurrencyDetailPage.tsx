import { Button, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router';

import { PageWrapper, QueryWrapper } from '../../components';
import CryptoCurrencyDetailChart from './components/CryptoCurrencyDetailChart';
import CryptoCurrencyInfo from './components/CryptoCurrencyInfo';
import CryptoCurrencyValueHistoryTable from './components/CryptoCurrencyValueHistoryTable';
import { useCryptoCurrencyDetailQuery } from './queries';

const { TabPane } = Tabs;

interface Props {}
interface PageParams {
  id: string;
}

const CryptoCurrencyDetailPage: React.FC<Props> = () => {
  const { id } = useParams<PageParams>();
  const history = useHistory();

  const query = useCryptoCurrencyDetailQuery(id);

  return (
    <PageWrapper
      title={query.data?.name || 'Currency Currency Detail'}
      extra={<Button type="primary">History Import</Button>}
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(cryptoCurrency) => (
          <>
            <CryptoCurrencyInfo cryptoCurrency={cryptoCurrency} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoCurrencyValueHistoryTable
                  cryptoCurrency={cryptoCurrency}
                  // onAddClick={currencyValueHistoryAdd.open}
                  // onEditClick={currencyValueHistoryEdit.open}
                />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CryptoCurrencyDetailChart cryptoCurrency={cryptoCurrency} />
              </TabPane>
            </Tabs>
          </>
        )}
      />
    </PageWrapper>
  );
};

export default CryptoCurrencyDetailPage;
