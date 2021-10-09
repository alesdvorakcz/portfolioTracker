import { PageWrapper } from '../../components';
import CurrencyList from './components/CurrencyList';

interface Props {}

const CurrenciesPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Currencies">
      <CurrencyList />
    </PageWrapper>
  );
};

export default CurrenciesPage;
