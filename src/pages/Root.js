import styles from './styles/Root.module.css';
import { useState, useEffect, useRef } from 'react';
import {
  Link,
  useLoaderData
} from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";


export const Root = () => {
  const { isAuthenticated, username } = useLoaderData();
  const [isVisible, setIsVisible] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  const handleIsVisible = () => {
    isVisible?
      setIsVisible(false):
      setIsVisible(true);
  }

  const activeStatus = isVisible? styles.active: styles.inactive;

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
            <Link to='/support' className={styles.navLink}>
              Support
            </Link>
            <Link to='/download' className={styles.navLink}>
              Download
            </Link>
            <div className={styles.separator}></div>
            {isAuthenticated?
              <div className={styles.container} ref={menuRef}>
                <span className={styles.user} onClick={handleIsVisible}>
                  {username}
                  <RiArrowDropDownLine className={styles.icon} />
                </span>
                <div className={`${styles.actionMenu} ${activeStatus}`} >
                  <Link to='/logout' className={styles.navLink}>
                    <BiLogOut
                      className={styles.icon}
                      style={{marginRight: '10px'}}
                    />
                    Log Out
                  </Link>
                </div>
              </div>:
              <Link
                to='/auth/login'
                className={styles.navLink}
              >
                Log in
              </Link>
            }
            <Link
              to={isAuthenticated? '/app': '/auth/signup'}
              className={`${styles.navLink} ${styles.CTA}`}
            >
              {isAuthenticated? 'Dashboard': 'Get Started'}
            </Link>
          </nav>
        </section>
      </header>
      <section>
      </section>
      <footer>
      </footer>
    </div>
  );
}
