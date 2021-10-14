import { List } from 'antd';

import { Account, Currency } from '../../../api/models';
import { Box } from '../../../components';
import AccountCard from './AccountCard';

interface Props {
  accounts: Account[];
  currencies?: Currency[];
}

const AccountList: React.FC<Props> = ({ accounts, currencies }) => {
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
        dataSource={accounts}
        rowKey="id"
        renderItem={(item) => {
          const currency = currencies?.find((x) => x.id === item.currencyId);

          return (
            <List.Item>
              <AccountCard account={item} currency={currency} />
            </List.Item>
          );
        }}
      />
    </Box>
  );
};

export default AccountList;
