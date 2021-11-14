import { Button } from 'antd';

import { PageWrapper } from '../../components';
import CryptoWalletList from './components/CryptoWalletList';

interface Props {}

const CryptoWalletsPage: React.FC<Props> = () => {
  return (
    <PageWrapper title="Crypto Wallets" extra={<Button type="primary">Add Wallet</Button>}>
      <CryptoWalletList />
    </PageWrapper>
  );
};

export default CryptoWalletsPage;
