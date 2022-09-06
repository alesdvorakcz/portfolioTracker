import { List } from 'antd';

import { Box } from '../../../components';
import { AccountData } from '../../../contexts/tradesContext';
import AccountCard from './AccountCard';

interface Props {
  accountData: AccountData;
}

const AccountsList: React.FC<Props> = ({ accountData }) => {
  return (
    <Box>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 3,
        }}
        dataSource={accountData.accounts}
        rowKey="name"
        renderItem={(account) => (
          <List.Item>
            <AccountCard account={account} />
          </List.Item>
        )}
      />
    </Box>
  );
};

export default AccountsList;
