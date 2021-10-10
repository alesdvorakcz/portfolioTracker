import { Button, Drawer, Space } from 'antd';

import { FlexRow, PageWrapper } from '../../components';
import CurrencyList from './components/CurrencyList';
import HistoryImportForm from './components/HistoryImportForm';
import { useHistoryImport } from './useHistoryImport';

interface Props {}

const CurrenciesPage: React.FC<Props> = () => {
  const historyImport = useHistoryImport();

  return (
    <PageWrapper
      title="Currencies"
      extra={
        <Button type="primary" onClick={historyImport.open}>
          History Import
        </Button>
      }
    >
      <CurrencyList />
      <Drawer
        width={640}
        onClose={historyImport.close}
        maskClosable={false}
        title="History Import"
        visible={historyImport.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={historyImport.close}>Cancel</Button>
              <Button
                loading={historyImport.isLoading}
                type="primary"
                onClick={() => historyImport.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <HistoryImportForm
          formRef={historyImport.formRef}
          onSubmit={historyImport.onSubmit}
          hideSubmitButton
        />
      </Drawer>
    </PageWrapper>
  );
};

export default CurrenciesPage;
