import styles from './styles/TopNavDashboard.module.css';
import {
  IconLink,
  Separator,
  UserMenu
} from '../common';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';


export const TopNavDashboard = (props) => {
  const { isEmptyList } = props;

  return (
      <header className={styles.header}>
        <section className={styles.headerSection}>
          <Link to='/organizations/overview'>
            <img
              src='/logo192name.png'
              style={{ objectFit: 'cover' }}
              width={128}
              height={64}
              alt='Logo'
            />
          </Link>
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
