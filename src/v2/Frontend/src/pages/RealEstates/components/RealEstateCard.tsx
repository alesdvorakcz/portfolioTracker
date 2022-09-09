import { Card, Statistic } from 'antd';
import { useNavigate } from 'react-router';

import { RealEstate } from '../../../api/models';
import { toCurrencyFormat } from '../../../i18n';

interface Props {
  realEstate: RealEstate;
}

const RealEstateCard: React.FC<Props> = ({ realEstate }) => {
  const navigate = useNavigate();

  return (
    <Card
      title={realEstate.name}
      hoverable
      onClick={() => navigate(`/realEstates/${realEstate.id}`)}
    >
      <Statistic title="Value" value={toCurrencyFormat(realEstate.totalValue)} />
    </Card>
  );
};

export default RealEstateCard;
