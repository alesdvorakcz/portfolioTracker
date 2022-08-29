import { Card } from 'antd';
import { useNavigate } from 'react-router';

import { Etf } from '../../../api/models';
// import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../../../i18n';

const { Meta } = Card;

interface Props {
  etf: Etf;
}

const EtfCard: React.FC<Props> = ({ etf }) => {
  const navigate = useNavigate();

  return (
    <Card style={{}} hoverable onClick={() => navigate(`/etfs/${etf.id}`)}>
      <Meta title={etf.name} />
    </Card>
  );
};

export default EtfCard;
