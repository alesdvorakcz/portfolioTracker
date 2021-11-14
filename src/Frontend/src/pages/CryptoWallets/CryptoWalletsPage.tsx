import { Button, Drawer, Space } from 'antd';

import { FlexRow, PageWrapper } from '../../components';
import AddCryptoWalletForm from './components/AddCryptoWalletForm';
import CryptoWalletList from './components/CryptoWalletList';
import { useCryptoWalletAdd } from './useCryptoWalletAdd';

interface Props {}

const CryptoWalletsPage: React.FC<Props> = () => {
  const cryptoWalletAdd = useCryptoWalletAdd();

  return (
    <PageWrapper
      title="Crypto Wallets"
      extra={
        <Button type="primary" onClick={cryptoWalletAdd.open}>
          Add Wallet
        </Button>
      }
    >
      <CryptoWalletList />
      <Drawer
        width={640}
        onClose={cryptoWalletAdd.close}
        maskClosable={false}
        title="Add Crypto Wallet"
        visible={cryptoWalletAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={cryptoWalletAdd.close}>Cancel</Button>
              <Button
                loading={cryptoWalletAdd.isLoading}
                type="primary"
                onClick={() => cryptoWalletAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddCryptoWalletForm
          formRef={cryptoWalletAdd.formRef}
          onSubmit={cryptoWalletAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
    </PageWrapper>
  );
};

export default CryptoWalletsPage;
