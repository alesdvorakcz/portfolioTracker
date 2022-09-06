import { List } from 'antd';

import { Box } from '../../../components';
import { CryptoData } from '../../../contexts/tradesContext';
import CryptoWalletCard from './CryptoWalletCard';

interface Props {
  cryptoData: CryptoData;
}

const CryptoWalletsList: React.FC<Props> = ({ cryptoData }) => {
  return (
    <Box>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 5,
        }}
        dataSource={cryptoData.cryptoWallets}
        rowKey="id"
        renderItem={(item) => (
          <List.Item>
            <CryptoWalletCard wallet={item} />
          </List.Item>
        )}
      />
    </Box>
  );
};

export default CryptoWalletsList;
