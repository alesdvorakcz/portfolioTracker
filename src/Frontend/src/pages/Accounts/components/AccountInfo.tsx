import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Descriptions, Space } from 'antd';

import { AccountDetail } from '../../../api/models';
import { Box, DeleteConfirm } from '../../../components';
import { useCurrenciesQuery } from '../../Currencies/queries';

interface Props {
  account: AccountDetail;
  onEditClick: () => void;
  onDeleteClick: () => Promise<void>;
}

const AccountInfo: React.FC<Props> = ({ account, onEditClick, onDeleteClick }) => {
  const currenciesQuery = useCurrenciesQuery();

  const currency = currenciesQuery.data?.find((x) => x.id === account.currencyId);

  return (
    <Box>
      <Descriptions
        title="Info"
        column={1}
        extra={
          <Space>
            <Button type="primary" icon={<EditOutlined />} onClick={onEditClick}>
              Edit
            </Button>
            <DeleteConfirm onDelete={onDeleteClick}>
              <Button icon={<DeleteOutlined />}>Delete</Button>
            </DeleteConfirm>
          </Space>
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
