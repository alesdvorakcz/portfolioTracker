import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Statistic } from 'antd';
import { useHistory } from 'react-router';

import { Currency, EtfInstrument } from '../../../api/models';
import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

interface Props {
  etfInstrument: EtfInstrument;
  currency?: Currency;
}

const EtfInstrumentCard: React.FC<Props> = ({ etfInstrument, currency }) => {
  const history = useHistory();

  const isSameCurrency = currency ? currency.id === DEFAULT_CURRENCY : true;
  let valueText = etfInstrument.value?.toLocaleString(DEFAULT_LOCALE, {
    style: 'currency',
    currency: currency?.id ?? DEFAULT_CURRENCY,
  });

  if (!isSameCurrency && !!etfInstrument.valueCZK) {
    valueText += ` / ${etfInstrument.valueCZK?.toLocaleString(DEFAULT_LOCALE, {
      style: 'currency',
      currency: DEFAULT_CURRENCY,
    })}`;
  }

  const gain =
    etfInstrument.valueCZK && etfInstrument.cumulativeTransactionsCZK
      ? etfInstrument.valueCZK / etfInstrument.cumulativeTransactionsCZK - 1
      : null;

  const isGainPositive = gain && gain > 0;

  return (
    <Card
      title={etfInstrument.name}
      extra={etfInstrument.slug}
      hoverable
      onClick={() => history.push(`/etfs/${etfInstrument.id}`)}
    >
      <div>
        <Statistic title="Value" value={valueText} />
        <Statistic
          title="Profit"
          prefix={isGainPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          valueStyle={{ color: isGainPositive ? 'green' : 'red' }}
          value={(gain ?? 0).toLocaleString(DEFAULT_LOCALE, {
            style: 'percent',
            minimumFractionDigits: 2,
          })}
        />
      </div>
    </Card>
  );
};

export default EtfInstrumentCard;
