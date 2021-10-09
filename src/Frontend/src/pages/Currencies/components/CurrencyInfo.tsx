import { EditOutlined } from '@ant-design/icons';
import { Button, Descriptions } from 'antd';

import { CurrencyDetail } from '../../../api/models';
import { Box } from '../../../components';

interface Props {
  currency: CurrencyDetail;
  onEditClick: () => void;
}

const CurrencyInfo: React.FC<Props> = ({ currency, onEditClick }) => {
  return (
    <Box>
      <Descriptions
        title="Info"
        column={1}
        extra={
          <Button type="primary" icon={<EditOutlined />} onClick={onEditClick}>
            Edit
          </Button>
        }
      >
        <Descriptions.Item label="Id">{currency.id}</Descriptions.Item>
        <Descriptions.Item label="Name">{currency.name}</Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default CurrencyInfo;
