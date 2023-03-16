import { PropsWithChildren } from 'react';

import styles from './FlexRow.module.css';

interface Props {
  align?: 'left' | 'right' | 'center' | 'full';
  marginBottom?: boolean;
}

const FlexRow: React.FC<PropsWithChildren<Props>> = ({
  align = 'full',
  marginBottom,
  children,
}) => {
  const justifyContent =
    align === 'right'
      ? { justifyContent: 'flex-end' }
      : align === 'center'
      ? { justifyContent: 'space-around' }
      : align === 'left'
      ? { justifyContent: 'flex-start' }
      : { justifyContent: 'space-between' };

  const margins = marginBottom ? { marginBottom: 15 } : {};

  return (
    <div className={styles.flexRow} style={{ ...justifyContent, ...margins }}>
      {children}
    </div>
  );
};

export default FlexRow;
