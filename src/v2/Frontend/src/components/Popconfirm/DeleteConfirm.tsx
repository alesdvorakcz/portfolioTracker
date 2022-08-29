import { Popconfirm } from 'antd';
import { PropsWithChildren } from 'react';

interface Props {
  onDelete: () => Promise<void>;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const DeleteConfirm: React.FC<PropsWithChildren<Props>> = ({
  onDelete,
  title = 'Are you sure to delete this record?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  children,
}) => {
  const onConfirm = async () => {
    await onDelete();
  };

  return (
    <Popconfirm title={title} onConfirm={onConfirm} okText={confirmText} cancelText={cancelText}>
      {children}
    </Popconfirm>
  );
};

export default DeleteConfirm;
