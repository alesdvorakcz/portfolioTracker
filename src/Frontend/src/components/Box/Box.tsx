import styles from './Box.module.css';

interface Props {}

const Box: React.FC<Props> = ({ children }) => {
  return <div className={styles.box}>{children}</div>;
};

export default Box;
