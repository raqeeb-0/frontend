import styles from './styles/TopNavDashboard.module.css';
import { Link } from 'react-router-dom';
import {
  IconLink,
  Separator,
  Logo,
  UserMenu
} from '../common';
import { MdAddCircleOutline } from 'react-icons/md';


export const TopNavDashboard = (props) => {
  const { isEmptyList } = props;

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
                  <IconLink
                    path='/organizations/create'
                    name='New organization'
                    icon=<MdAddCircleOutline />
                    margin='0 20px'
                  />
                  <Separator />
                </>
            }
            <UserMenu />
          </nav>
        </section>
      </header>
 
  );
}
