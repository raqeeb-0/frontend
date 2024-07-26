import styles from './styles/FirstHero.module.css';

export const HeroVector = () => {
  return (
    <div className={styles.heroVectorContainer}>
      <img
        className={styles.heroVector}
        src={process.env.PUBLIC_URL + '/heroVector.png'}
        alt='Hero Vector'
      />
    </div>
  );
}
