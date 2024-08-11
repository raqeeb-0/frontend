import styles from './styles/FormSep.module.css';


export const FormSep = () => {
  return (
    <div className={styles.container}>
      <span className={styles.line}></span>
      <span className={styles.txt}> or </span>
      <span className={styles.line}></span>
    </div>
  );
}
