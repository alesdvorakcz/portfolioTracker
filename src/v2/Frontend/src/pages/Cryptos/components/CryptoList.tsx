import { Alert, List } from 'antd';

import { Box, LoadingIndicator } from '../../../components';
import { CryptoData } from '../../../contexts/tradesContext';
import { useCryptosQuery } from '../queries';
import CryptoCard from './CryptoCard';

interface Props {
  cryptoData: CryptoData;
}

const CryptoList: React.FC<Props> = ({ cryptoData }) => {
  const query = useCryptosQuery();

  return (
    <Box>
      <>
        {query.isLoading && <LoadingIndicator />}
        {query.error && <Alert message={(query.error as any).message} type="error" />}
        {query.isSuccess && (
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
            dataSource={query.data}
            rowKey="id"
            renderItem={(item) => {
              const history = cryptoData.cryptoCurrenciesHistory.find((x) => x.id === item.id);
              return (
                <List.Item>
                  <CryptoCard crypto={item} history={history} />
                </List.Item>
              );
            }}
          />
        )}
      </>
    </Box>
  );
};

export default CryptoList;
