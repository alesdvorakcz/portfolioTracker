import { Card } from 'antd';
import { useHistory } from 'react-router';

import { Account, Currency } from '../../../api/models';

const { Meta } = Card;

interface Props {
  account: Account;
  currencies?: Currency[];
}

const AccountCard: React.FC<Props> = ({ account, currencies }) => {
  const history = useHistory();

  return (
    <Card style={{}} hoverable onClick={() => history.push(`/accounts/${account.id}`)}>
      <Meta
        title={account.name}
        description={
          currencies
            ? currencies.find((x) => x.id === account.currencyId)?.name
            : account.currencyId
        }
      />
    </Card>
  );
};

export default AccountCard;
