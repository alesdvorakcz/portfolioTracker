import { Alert, List } from 'antd';

import { Box, LoadingIndicator } from '../../../components';
import { useCurrenciesQuery } from '../../Currencies/queries';
import { useAccountsQuery } from '../queries';
import AccountCard from './AccountCard';

interface Props {}

const AccountList: React.FC<Props> = () => {
  const currenciesQuery = useCurrenciesQuery();
  const query = useAccountsQuery();

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
              <AccountCard account={item} currencies={currenciesQuery.data} />
            </List.Item>
          )}
        />
      )}
    </Box>
  );
};

export default AccountList;
