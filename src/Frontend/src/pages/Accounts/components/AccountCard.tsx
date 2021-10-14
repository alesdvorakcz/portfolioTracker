import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { useHistory } from 'react-router';

import { Account, Currency } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  account: Account;
  currency?: Currency;
}

const AccountCard: React.FC<Props> = ({ account, currency }) => {
  const history = useHistory();

  const isSameCurrency = currency ? currency.id === DEFAULT_CURRENCY : true;
  let valueText = account.valueAfter?.toLocaleString(DEFAULT_LOCALE, {
    style: 'currency',
    currency: currency?.id ?? DEFAULT_CURRENCY,
  });

  if (!isSameCurrency) {
    valueText += ` / ${account.valueAfterCZK?.toLocaleString(DEFAULT_LOCALE, {
      style: 'currency',
      currency: DEFAULT_CURRENCY,
    })}`;
  }

  const gain =
    account.valueAfterCZK && account.transactionsCZKTotal
      ? account.valueAfterCZK / account.transactionsCZKTotal - 1
      : null;

  const isGainPositive = gain && gain > 0;

  return (
    <Card title={account.name} hoverable onClick={() => history.push(`/accounts/${account.id}`)}>
      <div>
        <Statistic title="Value" value={valueText} />
        <Statistic
          title="Profit"
          prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
          value={
            gain?.toLocaleString(DEFAULT_LOCALE, {
              style: 'percent',
              minimumFractionDigits: 2,
            }) ?? '???'
          }
        />
      </div>
    </Card>
  );
};

export default AccountCard;
