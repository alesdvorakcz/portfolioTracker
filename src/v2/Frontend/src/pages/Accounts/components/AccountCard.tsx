import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { useNavigate } from 'react-router';

import { Account } from '../../../api/models';
import { DEFAULT_CURRENCY, toCurrencyFormat, toPercentFormat } from '../../../i18n';

interface Props {
  account: Account;
}

const AccountCard: React.FC<Props> = ({ account }) => {
  const navigate = useNavigate();

  const isSameCurrency = account.currencyId === DEFAULT_CURRENCY;
  let valueText = toCurrencyFormat(account?.value, account?.currencyId);

  if (!isSameCurrency && !!account?.valueCZK) {
    valueText += ` / ${toCurrencyFormat(account.valueCZK)}`;
  }

  const gain =
    account?.valueCZK && account?.cumulativeTransactionsCZK
      ? account.valueCZK / account.cumulativeTransactionsCZK - 1
      : null;

  const isGainPositive = gain && gain > 0;

  return (
    <Card title={account.name} hoverable onClick={() => navigate(`/accounts/${account.id}`)}>
      <Statistic title="Value" value={valueText} />
      <Statistic
        title="Profit"
        prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
        value={toPercentFormat(gain ?? 0)}
      />
    </Card>
  );
};

export default AccountCard;
