import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';

import { AccountDetail, Currency } from '../../../api/models';
import { Box } from '../../../components';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  account: AccountDetail;
  currency?: Currency;
}

const AccountInfo: React.FC<Props> = ({ account, currency }) => {
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
    <Box>
      <Row>
        <Col xs={24} md={12}>
          <Statistic title="Last Value" value={valueText} />
        </Col>
        <Col xs={12} md={6}>
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
        </Col>
        <Col xs={12} md={6}>
          <Statistic
            title="Total Transaction"
            value={
              account.transactionsCZKTotal &&
              account.transactionsCZKTotal.toLocaleString(DEFAULT_LOCALE, {
                style: 'currency',
                currency: DEFAULT_CURRENCY,
              })
            }
          />
        </Col>
      </Row>
    </Box>
  );
};

export default AccountInfo;
