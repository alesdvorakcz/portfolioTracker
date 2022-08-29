import { PageWrapper } from '../../components';
import CryptoList from './components/CryptoList';

interface Props {}

const CryptoPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Crypto">
      <CryptoList />
    </PageWrapper>
  );
};

export default CryptoPage;
