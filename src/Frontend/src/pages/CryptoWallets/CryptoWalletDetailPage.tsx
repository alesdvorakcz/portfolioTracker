import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router';

import { DeleteConfirm, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCryptoCurrenciesQuery } from '../CryptoCurrencies/queries';
import CryptoWalletDetailChart from './components/CryptoWalletDetailChart';
import CryptoWalletInfo from './components/CryptoWalletInfo';
import CryptoWalletTradesTable from './components/CryptoWalletTradesTable';
import EditCryptoWalletForm from './components/EditCryptoWalletForm';
import { useCryptoWalletDetailQuery } from './queries';
import { useCryptoWalletDelete } from './useCryptoWalletDelete';
import { useCryptoWalletEdit } from './useCryptoWalletEdit';

const { TabPane } = Tabs;

interface Props {}
interface PageParams {
  id: string;
}

const CryptoWalletDetailPage: React.FC<Props> = () => {
  const params = useParams<PageParams>();
  const history = useHistory();

  const id = parseInt(params.id, 10);

  const cryptoCurrenciesQuery = useCryptoCurrenciesQuery();
  const query = useCryptoWalletDetailQuery(id);
  const cryptoWalletEdit = useCryptoWalletEdit(id);
  const cryptoWalletDelete = useCryptoWalletDelete(id);

  const cryptoCurrency =
    query.data && cryptoCurrenciesQuery.data?.find((x) => x.id === query.data.cryptoCurrencyId);

  return (
    <PageWrapper
      title={query.data?.name || 'Crypto Wallet Detail'}
      subtitle={cryptoCurrency?.name}
      goBack={() => history.goBack()}
      extra={
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={cryptoWalletEdit.open}>
            Edit
          </Button>
          <DeleteConfirm onDelete={cryptoWalletDelete.onDelete}>
            <Button icon={<DeleteOutlined />}>Delete</Button>
          </DeleteConfirm>
        </Space>
      }
    >
      <QueryWrapper
        query={query}
        render={(wallet) => (
          <>
            <CryptoWalletInfo wallet={wallet} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoWalletTradesTable
                  wallet={wallet}
                  // onAddClick={currencyValueHistoryAdd.open}
                  // onEditClick={currenc yValueHistoryEdit.open}
                />
              </TabPane>
              <TabPane tab="Chart" key="2">
                <CryptoWalletDetailChart wallet={wallet} />
              </TabPane>
            </Tabs>
          </>
        )}
      />
      <Drawer
        width={640}
        onClose={cryptoWalletEdit.close}
        maskClosable={false}
        title="Edit Crypto Wallet"
        visible={cryptoWalletEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={cryptoWalletEdit.close}>Cancel</Button>
              <Button
                loading={cryptoWalletEdit.isLoading}
                type="primary"
                onClick={() => cryptoWalletEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {query.data && (
          <EditCryptoWalletForm
            cryptoCurrencyWallet={query.data}
            formRef={cryptoWalletEdit.formRef}
            onSubmit={cryptoWalletEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
    </PageWrapper>
  );
};

export default CryptoWalletDetailPage;
