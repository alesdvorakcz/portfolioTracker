import { PageWrapper } from '../../components';
import EtfList from './components/EtfList';

interface Props {}

const EtfsPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Etfs">
      <EtfList />
    </PageWrapper>
  );
};

export default EtfsPage;
