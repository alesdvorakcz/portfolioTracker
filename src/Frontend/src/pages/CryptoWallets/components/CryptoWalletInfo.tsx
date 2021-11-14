import { Descriptions } from 'antd';

import { CryptoCurrencyWalletDetail } from '../../../api/models';
import { Box } from '../../../components';

interface Props {
  wallet: CryptoCurrencyWalletDetail;
}

const CryptoWalletInfo: React.FC<Props> = ({ wallet }) => {
  return (
    <Box>
      <Descriptions title="Info" column={1}>
        <Descriptions.Item label="Id">{wallet.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{wallet.name}</Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CryptoWalletInfo;
