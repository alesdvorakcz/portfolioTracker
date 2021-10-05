import { Alert } from 'antd';
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
        <div style={{ display: 'flex', margin: -10 }}>
          {query.data?.map((item) => (
            <AccountCard account={item} key={item.id} />
          ))}
        </div>
      )}
    </Box>
  );
};

export default AccountList;
