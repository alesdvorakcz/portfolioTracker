import styles from './FlexRow.module.css';

interface Props {
  align?: 'left' | 'right' | 'center' | 'full';
  marginBottom?: boolean;
}

const FlexRow: React.FC<Props> = ({ align = 'full', marginBottom, children }) => {
  const justifyContent =
    align === 'right'
      ? { justifyContent: 'flex-end' }
      : align === 'center'
      ? { justifyContent: 'space-around' }
      : align === 'full'
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
