import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import {
  IconNavLink,
  Separator,
  Logo,
  UserMenu
} from '../common';
import { MdAddCircleOutline } from 'react-icons/md';


export const TopNav = (props) => {
  const { isAuthenticated, username, isEmptyList } = props;

  return (
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Logo
            imagePath='/logo192name.png'
          />
          <nav className={styles.nav}>
            {
              !isEmptyList &&
                <>
                  <IconNavLink
                    path='/organizations/create'
                    name='New organization'
                    icon=<MdAddCircleOutline />
                  />
                  <Separator />
                </>
            }
            {
              isAuthenticated?
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
          </nav>
        </section>
      </header>
 
  );
}
