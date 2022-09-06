import { Alert, List } from 'antd';

import { Box, LoadingIndicator } from '../../../components';
import { useCurrenciesQuery } from '../queries';
import CurrencyCard from './CurrencyCard';

interface Props {}

const CurrencyList: React.FC<Props> = () => {
  const query = useCurrenciesQuery();

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
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={query.data}
            rowKey="id"
            renderItem={(item) => (
              <List.Item>
                <CurrencyCard currency={item} />
              </List.Item>
            )}
          />
        )}
      </>
    </Box>
  );
};

export default CurrencyList;
