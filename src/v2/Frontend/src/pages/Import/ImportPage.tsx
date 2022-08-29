import { Button } from 'antd';

import { FlexRow, PageWrapper } from '../../components';
import { useCryptoImport } from './useCryptoImport';
import { useCurrencyImport } from './useCurrencyImport';
import { useEtfImport } from './useEtfImport';

interface Props {}

const ImportPage: React.FC<Props> = () => {
  const currencyImport = useCurrencyImport();
  const cryptoImport = useCryptoImport();
  const etfImport = useEtfImport();

  return (
    <PageWrapper title="Import">
      <Button
        type="primary"
        style={{ margin: 10 }}
        onClick={() => currencyImport.onImport()}
        loading={currencyImport.isLoading}
      >
        Import Currencies
      </Button>
      <Button
        type="primary"
        style={{ margin: 10 }}
        onClick={() => etfImport.onImport()}
        loading={etfImport.isLoading}
      >
        Import Etfs
      </Button>
      <Button
        type="primary"
        style={{ margin: 10 }}
        onClick={() => cryptoImport.onImport()}
        loading={cryptoImport.isLoading}
      >
        Import Cryptos
      </Button>
    </PageWrapper>
  );
};

export default ImportPage;
