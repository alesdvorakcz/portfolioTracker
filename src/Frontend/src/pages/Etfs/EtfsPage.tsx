import { Button, Drawer, Space } from 'antd';

import { FlexRow, PageWrapper, QueryWrapper } from '../../components';
import { useCurrenciesQuery } from '../Currencies/queries';
import AddEtfInstrumentForm from './components/AddEtfInstrumentForm';
import EtfInstrumentList from './components/EtfInstrumentList';
import { useEtfInstrumentsQuery } from './queries';
import { useEtfInstrumentToAdd } from './useEtfInstrumentToAdd';

interface Props {}

const EtfsPage: React.FC<Props> = () => {
  const currenciesQuery = useCurrenciesQuery();
  const query = useEtfInstrumentsQuery();
  const etfInstrumentAdd = useEtfInstrumentToAdd();

  return (
    <PageWrapper
      title="ETFs"
      extra={
        <Button type="primary" onClick={etfInstrumentAdd.open}>
          Add ETF
        </Button>
      }
    >
      <QueryWrapper
        query={query}
        render={(data) => {
          return (
            <>
              <EtfInstrumentList etfInstruments={data} currencies={currenciesQuery.data} />
            </>
          );
        }}
      />
      <Drawer
        width={640}
        onClose={etfInstrumentAdd.close}
        maskClosable={false}
        title="Add ETF Instrument"
        visible={etfInstrumentAdd.isOpen}
        destroyOnClose
        footer={
          <FlexRow align="right">
            <Space>
              <Button onClick={etfInstrumentAdd.close}>Cancel</Button>
              <Button
                loading={etfInstrumentAdd.isLoading}
                type="primary"
                onClick={() => etfInstrumentAdd.formRef.current?.submitForm()}
              >
                Save
              </Button>
            </Space>
          </FlexRow>
        }
      >
        <AddEtfInstrumentForm
          formRef={etfInstrumentAdd.formRef}
          onSubmit={etfInstrumentAdd.onSubmit}
          hideSubmitButton
        />
      </Drawer>
    </PageWrapper>
  );
};

export default EtfsPage;
