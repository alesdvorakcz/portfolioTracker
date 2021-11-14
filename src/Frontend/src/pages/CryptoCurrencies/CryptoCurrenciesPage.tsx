import { Button } from 'antd';

import { PageWrapper } from '../../components';
import CryptoCurrencyList from './components/CryptoCurrencyList';

interface Props {}

const CryptoCurrenciesPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Crypto Currencies" extra={<Button type="primary">History Import</Button>}>
      <CryptoCurrencyList />
    </PageWrapper>
  );
};

export default CryptoCurrenciesPage;
