import { Alert } from 'antd';
import moment from 'moment';

import { AccountDetail, Currency } from '../../../api/models';

interface Props {
  account: AccountDetail;
  currency?: Currency;
}

const MissingCurrencyRateWarning: React.FC<Props> = ({ account, currency }) => {
  const missingRates = account.history.filter((x) => !x.conversionRate);
  if (missingRates.length === 0) return null;
  return (
    <Alert
      style={{ marginBottom: 25 }}
      showIcon
      type="warning"
      message={`Missing ${currency?.name} currency rate for date(s):`}
      description={missingRates.map((x) => {
        const date = moment.utc(x.date).format('l');
        return <div key={x.id}>{date}</div>;
      })}
    />
  );
};

export default MissingCurrencyRateWarning;
