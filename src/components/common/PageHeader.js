import styles from './styles/PageHeader.module.css';


export const PageHeader = (props) => {
  const { value } = props;

  return (
    <h1 className={styles.h1}>
      { value }
    </h1>
  );
}
