import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Drawer, Space, Tabs } from 'antd';
import { useHistory, useParams } from 'react-router';

import { DeleteConfirm, FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCryptoCurrenciesQuery } from '../CryptoCurrencies/queries';
import AddTradeForm from './components/AddTradeForm';
import CryptoWalletDetailChart from './components/CryptoWalletDetailChart';
import CryptoWalletInfo from './components/CryptoWalletInfo';
import CryptoWalletTradesTable from './components/CryptoWalletTradesTable';
import EditCryptoWalletForm from './components/EditCryptoWalletForm';
import EditTradeForm from './components/EditTradeForm';
import { useCryptoWalletDetailQuery } from './queries';
import { useCryptoWalletDelete } from './useCryptoWalletDelete';
import { useCryptoWalletEdit } from './useCryptoWalletEdit';
import { useCryptoWalletTradeAdd } from './useCryptoWalletTradeAdd';
import { useCryptoWalletTradeDelete } from './useCryptoWalletTradeDelete';
import { useCryptoWalletTradeEdit } from './useCryptoWalletTradeEdit';

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
  const cryptoWalletTradeAdd = useCryptoWalletTradeAdd(id);
  const cryptoWalletTradeEdit = useCryptoWalletTradeEdit(id);
  const cryptoWalletTradeDelete = useCryptoWalletTradeDelete(id);

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
            <CryptoWalletInfo wallet={wallet} cryptoCurrency={cryptoCurrency} />

            <Tabs defaultActiveKey="1">
              <TabPane tab="Table" key="1">
                <CryptoWalletTradesTable
                  wallet={wallet}
                  onAddClick={cryptoWalletTradeAdd.open}
                  onEditClick={cryptoWalletTradeEdit.open}
                  onDeleteClick={cryptoWalletTradeDelete.onDelete}
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
        onClose={cryptoWalletTradeAdd.close}
        maskClosable={false}
        title="Add Trade"
        visible={cryptoWalletTradeAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={cryptoWalletTradeAdd.close}>Cancel</Button>
              <Button
                loading={cryptoWalletTradeAdd.isLoading}
                type="primary"
                onClick={() => cryptoWalletTradeAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddTradeForm
          formRef={cryptoWalletTradeAdd.formRef}
          onSubmit={cryptoWalletTradeAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
      <Drawer
        width={640}
        onClose={cryptoWalletTradeEdit.close}
        maskClosable={false}
        title="Edit Trade"
        visible={cryptoWalletTradeEdit.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={cryptoWalletTradeEdit.close}>Cancel</Button>
              <Button
                loading={cryptoWalletTradeEdit.isLoading}
                type="primary"
                onClick={() => cryptoWalletTradeEdit.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        {cryptoWalletTradeEdit.selectedTrade && (
          <EditTradeForm
            trade={cryptoWalletTradeEdit.selectedTrade}
            formRef={cryptoWalletTradeEdit.formRef}
            onSubmit={cryptoWalletTradeEdit.onSubmit}
            hideSubmitButton
          />
        )}
      </Drawer>
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
