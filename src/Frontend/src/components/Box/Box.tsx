import styles from './Box.module.css';

interface Props {
  flex?: boolean;
}

const Box: React.FC<Props> = ({ flex, children }) => {
  return (
    <div className={styles.box} style={flex ? { flex: 1 } : {}}>
      {children}
    </div>
  );
};

export default Box;
