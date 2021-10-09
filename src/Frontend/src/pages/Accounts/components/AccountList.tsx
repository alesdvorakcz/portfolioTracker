import { Alert, List } from 'antd';
import { useQuery } from 'react-query';

import apiClient from '../../../api';
import { Box, LoadingIndicator } from '../../../components';
import AccountCard from './AccountCard';

interface Props {}

const AccountList: React.FC<Props> = () => {
  const query = useQuery('accounts', apiClient.accounts.getAccounts);

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
              <AccountCard account={item} />
            </List.Item>
          )}
        />
      )}
    </Box>
  );
};

export default AccountList;
