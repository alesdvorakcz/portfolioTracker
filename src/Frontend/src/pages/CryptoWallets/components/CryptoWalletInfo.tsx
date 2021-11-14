import { Descriptions } from 'antd';

import { CryptoCurrency, CryptoCurrencyWalletDetail } from '../../../api/models';
import { Box } from '../../../components';

interface Props {
  wallet: CryptoCurrencyWalletDetail;
  cryptoCurrency?: CryptoCurrency;
}

const CryptoWalletInfo: React.FC<Props> = ({ wallet, cryptoCurrency }) => {
  return (
    <Box>
      <Descriptions title="Info" column={1}>
        <Descriptions.Item label="Id">{wallet.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{wallet.name}</Descriptions.Item>
        <Descriptions.Item label="Crypto Currency">{cryptoCurrency?.name}</Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CryptoWalletInfo;
