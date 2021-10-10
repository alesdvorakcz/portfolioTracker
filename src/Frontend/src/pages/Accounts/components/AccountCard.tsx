import { Card } from 'antd';
import { useHistory } from 'react-router';

import { Account, Currency } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

const { Meta } = Card;

interface Props {
  account: Account;
  currency?: Currency;
}

const AccountCard: React.FC<Props> = ({ account, currency }) => {
  const history = useHistory();

  return (
    <Card style={{}} hoverable onClick={() => history.push(`/accounts/${account.id}`)}>
      <Meta
        title={account.name}
        description={
          <div>
            <div>
              {account.valueAfter?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: currency?.id ?? DEFAULT_CURRENCY,
              })}
            </div>
            <div>
              {account.valueAfterCZK?.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default AccountCard;
