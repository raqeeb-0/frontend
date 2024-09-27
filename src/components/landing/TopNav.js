import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import {
  ButtonLoader,
  Hamburger,
  Separator
} from '../common';
import { useAuth } from '../../hooks';
import { useState, useEffect } from 'react';
import { DownloadPWALink } from './DownloadPWALink';


export const TopNav = () => {
  const { username, isLoading, handleLogout } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
  }

  const glassCSS = isScrolled || isNavOpen ? styles.glass : '';

  const spanCSS = isNavOpen ? styles.span : '';

  const openCSS = isNavOpen ? styles.open : '';

  return (
    <header className={`${styles.container} ${glassCSS} ${spanCSS}`}>
      <Link to='/'>
        <img
          src='/logo192name.png'
          style={{ objectFit: 'cover' }}
          width={128}
          height={64}
          alt='Logo'
        />
      </Link>
      <nav>
        <ul className={openCSS}>
          <li><DownloadPWALink /></li>
          <li><a href='#features'>Features</a></li>
          <li><a href='#top'>Home</a></li>
          <div className={styles.separator}><Separator /></div>
          <li>
            {
              isLoading
              ? <div className={styles.loader}><ButtonLoader loaderStyle='dark' /></div>
              : username
                ? <Link to='/auth/logout' onClick={logout}>Log out</Link>
                : <Link to='/auth/login'>Log in</Link>
            }
          </li>
          <li>
            {
              isLoading
              ? <div className={styles.loader}><ButtonLoader loaderStyle='dark' /></div>
              : username
                ? <Link to='/organizations/overview'>Dashboard</Link>
                : <Link to='/auth/signup'>Sign up</Link>
            }
          </li>
        </ul>
      </nav>
      <div className={styles.hamburger}>
        <Hamburger
          isOpen={isNavOpen}
          toggle={() => setIsNavOpen(!isNavOpen)}
        />
      </div>
    </header>
  );
}
