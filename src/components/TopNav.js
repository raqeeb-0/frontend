import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { UserMenu } from './UserMenu';


export const TopNav = (props) => {
  const { isAuthenticated, username } = props;

  return (
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Logo
            imagePath='/logo192name.png'
          />
          <nav className={styles.nav}>
            <Link to='/support' className={styles.navLink}>
              Support
            </Link>
            <Link to='/download' className={styles.navLink}>
              Download
            </Link>
            <div className={styles.separator}></div>
            {isAuthenticated?
              <UserMenu
                username={username}
              />:
              <Link
                to='/auth/login'
                className={styles.navLink}
              >
                Log in
              </Link>
            }
            <Link
              to={isAuthenticated? '/app': '/auth/signup'}
              className={`${styles.navLink} ${styles.callToAction}`}
            >
              {isAuthenticated? 'Dashboard': 'Get Started'}
            </Link>
          </nav>
        </section>
      </header>
 
  );
}
