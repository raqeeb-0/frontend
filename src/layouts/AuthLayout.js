import styles from './styles/AuthLayout.module.css';


export const AuthLayout = ({ children }) => {
  return (
    <section className={styles.page}>
      <main className={styles.main}>
        <img
          src={process.env.PUBLIC_URL + '/logo192name.png'}
          width={192}
          height={192}
          alt='Logo'
        />
        { children }
      </main>
    </section>
  );
}
