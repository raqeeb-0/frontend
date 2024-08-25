import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import {
  ButtonLoader,
  Separator,
  Logo,
  UserMenu
} from '../common';
import { useAuth } from '../../hooks/common';


export const TopNav = () => {
  const { username, isLoading } = useAuth();

  return (
    <header className={styles.header}>
      <section>
        <Logo
          imagePath='/logo192name.png'
          to='/'
        />
        <nav className={styles.nav}>
          <Link to='/support' className={styles.navLink}>
            Support
          </Link>
          <Link to='/download' className={styles.navLink}>
            Download
          </Link>
          <Separator />
          {
            isLoading
              ?<div className={styles.loaderContainer}>
                <ButtonLoader loaderStyle='dark' />
              </div>
              :<>
                {
                  username
                    ?<UserMenu />
                    :<Link
                      to='/auth/login'
                      className={styles.navLink}
                    >
                      Log in
                    </Link>
                }
                <Link
                  to={username? '/dashboard': '/auth/signup'}
                  className={`${styles.navLink} ${styles.callToAction}`}
                >
                  {username? 'Dashboard': 'Get Started'}
                </Link>
              </>
          }
        </nav>
      </section>
    </header>
  );
}
