import styles from './styles/TopNavDashboard.module.css';
import { Link } from 'react-router-dom';
import {
  IconNavLink,
  Separator,
  Logo,
  UserMenu
} from '../common';
import { MdAddCircleOutline } from 'react-icons/md';
import { useAuth } from '../../hooks/common';


export const TopNavDashboard = (props) => {
  const { isEmptyList } = props;
  const { username, handleLogout } = useAuth();

  return (
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Logo
            imagePath='/logo192name.png'
            to='/dashboard'
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
            <UserMenu
              username={username}
              handleLogout={handleLogout}
            />
          </nav>
        </section>
      </header>
 
  );
}
