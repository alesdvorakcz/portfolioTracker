import styles from './FlexRow.module.css';

interface Props {
  align?: 'left' | 'right' | 'center' | 'full';
}

const FlexRow: React.FC<Props> = ({ align = 'full', children }) => {
  const style =
    align === 'right'
      ? { justifyContent: 'flex-end' }
      : align === 'center'
      ? { justifyContent: 'space-around' }
      : align === 'full'
      ? { justifyContent: 'flex-start' }
      : { justifyContent: 'space-between' };

  return (
    <div className={styles.flexRow} style={style}>
      {children}
    </div>
  );
};

export default FlexRow;
