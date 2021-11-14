import { Alert, List } from 'antd';

import { Box, LoadingIndicator } from '../../../components';
import { useCryptoCurrenciesQuery } from '../queries';
import CryptoCurrencyCard from './CryptoCurrencyCard';

interface Props {}

const CryptoCurrencyList: React.FC<Props> = () => {
  const query = useCryptoCurrenciesQuery();

  return (
    <Box>
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
          renderItem={(item) => (
            <List.Item>
              <CryptoCurrencyCard cryptoCurrency={item} />
            </List.Item>
          )}
        />
      )}
    </Box>
  );
};

export default CryptoCurrencyList;
