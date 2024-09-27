import styles from './styles/FeaturesHeader.module.css';


export const FeaturesHeader = () => {
  return (
    <header className={styles.container}>
      <div className={styles.circle}></div>
      <div className={styles.circle}></div>
      <h2>
        feature highlights
      </h2>
    </header>
  );
}
