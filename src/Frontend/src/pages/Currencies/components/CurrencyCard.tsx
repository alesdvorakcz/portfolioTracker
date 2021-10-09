import { Card } from 'antd';
import { useHistory } from 'react-router';

import { Currency } from '../../../api/models';

const { Meta } = Card;

interface Props {
  currency: Currency;
}

const CurrencyCard: React.FC<Props> = ({ currency }) => {
  const history = useHistory();

  return (
    <Card style={{}} hoverable onClick={() => history.push(`/currencies/${currency.id}`)}>
      <Meta title={currency.name} />
    </Card>
  );
};

export default CurrencyCard;
