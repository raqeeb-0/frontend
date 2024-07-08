import styles from './styles/Root.module.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../api/auth';


export const Root = () => {
  const [authStatus, setAuthStatus] = useState('');

  useEffect(() => {
    isLoggedIn()
      .then((r) => setAuthStatus(r.status))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Link to='/'>
            <img
              src={process.env.PUBLIC_URL + '/logo192name.png'}
              className={styles.logo}
              width={128}
              height={64}
              alt='Logo'
            />
          </Link>
          <nav className={styles.nav}>
            <Link to='/support' className={styles.navLink}> Support </Link>
            <Link to='/download' className={styles.navLink}> Download </Link>
            <div className={styles.separator}></div>
            <Link to='/auth/login' className={styles.navLink}> Log in </Link>
            <Link
              to='/auth/signup'
              className={`${styles.navLink} ${styles.CTA}`}
            > Get Started </Link>
          </nav>
        </section>
      </header>
      <section>
        <div>
          Test Is User Logged in: <br />
          { authStatus } 
        </div>
      </section>
      <footer>
      </footer>
    </div>
  );
}
