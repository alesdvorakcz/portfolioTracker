import { DeleteOutlined, ExportOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, message, Space, Spin, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { saveAs } from 'file-saver';
import { useState } from 'react';

import { Box, PageWrapper } from '../../components';
import { useTradesContext } from '../../tradesContext';
import { useCryptoImport } from './useCryptoImport';
import { useCurrencyImport } from './useCurrencyImport';
import { useEtfImport } from './useEtfImport';

interface Props {}

const ImportPage: React.FC<Props> = () => {
  const currencyImport = useCurrencyImport();
  const cryptoImport = useCryptoImport();
  const etfImport = useEtfImport();
  const { tradesData, setTradesData, clearData } = useTradesContext();

  const [file, setFile] = useState<UploadFile | undefined>();
  const [uploading, setUploading] = useState(false);

  const handleUploadTrades = async () => {
    const formData = new FormData();
    formData.append('file', file as RcFile);

    setUploading(true);

    try {
      const result = await fetch('http://localhost:3000/api/upload/trades', {
        method: 'POST',
        body: formData,
      });

      const json = await result.json();
      setTradesData(json);

      message.success('file uploaded sucessfully!');
      setFile(undefined);
    } catch {
      message.error('upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadAndExport = async () => {
    const formData = new FormData();
    formData.append('file', file as RcFile);

    setUploading(true);

    try {
      const result = await fetch('http://localhost:3000/api/upload/export', {
        method: 'POST',
        body: formData,
      });

      const blob = await result.blob();

      saveAs(blob, 'out.xlsx');
      setFile(undefined);
    } catch {
      message.error('upload failed!');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    fileList: file ? [file] : undefined,
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  return (
    <PageWrapper title="Import">
      <Box>
        <Space>
          <Button
            type="primary"
            onClick={() => currencyImport.onImport()}
            loading={currencyImport.isLoading}
          >
            Import Currencies
          </Button>
          <Button type="primary" onClick={() => etfImport.onImport()} loading={etfImport.isLoading}>
            Import Etfs
          </Button>
          <Button
            type="primary"
            onClick={() => cryptoImport.onImport()}
            loading={cryptoImport.isLoading}
          >
            Import Cryptos
          </Button>
        </Space>
      </Box>
      <Box>
        {uploading ? (
          <Spin />
        ) : (
          <>
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select a File</Button>
            </Upload>
            <Divider />
            <Space>
              <Button
                icon={<UploadOutlined />}
                disabled={!file}
                type="primary"
                onClick={handleUploadTrades}
              >
                Upload Trades
              </Button>
              <Button icon={<ExportOutlined />} disabled={!file} onClick={handleUploadAndExport}>
                Upload &amp; Export
              </Button>
              <Button
                icon={<DeleteOutlined />}
                onClick={clearData}
                type="dashed"
                danger
                disabled={tradesData.trades.length === 0}
              >
                Clear data
              </Button>
            </Space>
          </>
        )}
      </Box>
      <Box>
        {tradesData.trades.map((x) => (
          <div>
            {x.date} - {x.ticker}
          </div>
        ))}
      </Box>
    </PageWrapper>
  );
};

export default ImportPage;
