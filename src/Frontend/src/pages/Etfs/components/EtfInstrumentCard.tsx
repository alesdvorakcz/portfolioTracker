import { Card } from 'antd';
import { useHistory } from 'react-router';

import { Currency, EtfInstrument } from '../../../api/models';

interface Props {
  etfInstrument: EtfInstrument;
  currency?: Currency;
}

const EtfInstrumentCard: React.FC<Props> = ({ etfInstrument }) => {
  const history = useHistory();

  return (
    <Card
      title={etfInstrument.name}
      extra={etfInstrument.slug}
      hoverable
      onClick={() => history.push(`/etfs/${etfInstrument.id}`)}
    >
      TODO
    </Card>
  );
};

export default EtfInstrumentCard;
