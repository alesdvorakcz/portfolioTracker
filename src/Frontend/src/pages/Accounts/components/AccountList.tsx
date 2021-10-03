import { useQuery } from 'react-query';

import apiClient from '../../../api';

interface Props {}

const AccountList: React.FC<Props> = () => {
  const query = useQuery('accounts', apiClient.accounts.getAccounts);

  return (
    <div>
      {query.isLoading && <div>Loading</div>}
      {query.error && <div>{(query.error as any).message}</div>}
      {query.isSuccess && query.data?.map((item) => <div key={item.id}>{item.name}</div>)}
    </div>
  );
};

export default AccountList;
