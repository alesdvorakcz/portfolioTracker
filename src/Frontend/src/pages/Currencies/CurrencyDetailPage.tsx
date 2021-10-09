import { useHistory, useParams } from 'react-router-dom';

import { PageWrapper, QueryWrapper } from '../../components';
import CurrencyInfo from './components/CurrencyInfo';
import CurrencyValueHistoryTable from './components/CurrencyValueHistoryTable';
import { useCurrencyDetailQuery } from './queries';

interface Props {}

interface PageParams {
  id: string;
}

const CurrencyDetailPage: React.FC<Props> = () => {
  const { id } = useParams<PageParams>();
  const history = useHistory();

  const query = useCurrencyDetailQuery(id);

  return (
    <PageWrapper
      title={query.data?.name || 'Currency Detail'}
      subtitle="Currency Detail"
      goBack={() => history.goBack()}
    >
      <QueryWrapper
        query={query}
        render={(currency) => (
          <>
            <CurrencyInfo currency={currency} onEditClick={() => {}} />
            <CurrencyValueHistoryTable currency={currency} onEditClick={() => {}} />
          </>
        )}
      />
    </PageWrapper>
  );
};

export default CurrencyDetailPage;
