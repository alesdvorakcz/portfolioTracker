import { EditOutlined } from '@ant-design/icons';
import { Button, Descriptions } from 'antd';

import { AccountDetail } from '../../../api/models';
import { Box } from '../../../components';
import { useCurrenciesQuery } from '../../Currencies/queries';

interface Props {
  account: AccountDetail;
  onEditClick: () => void;
}

const AccountInfo: React.FC<Props> = ({ account, onEditClick }) => {
  const currenciesQuery = useCurrenciesQuery();

  const currency = currenciesQuery.data?.find((x) => x.id === account.currencyId);

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
        <Descriptions.Item label="Name">{account.name}</Descriptions.Item>
        <Descriptions.Item label="Slug">{account.slug}</Descriptions.Item>
        <Descriptions.Item label="Currency">{currency?.name}</Descriptions.Item>
      </Descriptions>
    </Box>
  );
};

export default AccountInfo;
