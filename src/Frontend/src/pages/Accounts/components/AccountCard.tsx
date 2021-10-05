import { Card } from 'antd';
import { useHistory } from 'react-router';

import { Account } from '../../../api/models';

const { Meta } = Card;

interface Props {
  account: Account;
}

const AccountCard: React.FC<Props> = ({ account }) => {
  const history = useHistory();

  return (
    <Card
      style={{ width: 300, margin: 10 }}
      hoverable
      onClick={() => history.push(`/accounts/${account.id}`)}
    >
      <Meta title={account.name} description={account.currencyId} />
    </Card>
  );
};

export default AccountCard;
