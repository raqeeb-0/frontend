import styles from './styles/TopNav.module.css';
import { Link } from 'react-router-dom';
import {
  ButtonLoader,
  Separator,
  Logo,
  UserMenu
} from '../common';
import { useAuth } from '../../hooks/common';
import { useState, useEffect } from 'react';


export const TopNav = ({ pageRef }) => {
  const PAGESCROLL = 50;
  const { username, isLoading, handleLogout } = useAuth();
  const [navBackground, setNavBackground] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const pageElement = pageRef.current;
    const handleScroll = () => {
      if (pageElement.scrollTop > PAGESCROLL) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };

    pageElement.addEventListener('scroll', handleScroll);

    return () => {
      pageElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener(
      'beforeinstallprompt', handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        'beforeinstallprompt', handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = (e) => {
    e.preventDefault();
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
          // Clear the deferred prompt
          setDeferredPrompt(null);
          // Hide the install button
          setIsInstallable(false);
        });
    }
  };

  return (
    <header className={`${styles.header} ${
      navBackground ? styles.navScrolled : ''
    }`}>
      <section>
        <Logo
          imagePath='/logo192name.png'
          to='/'
        />
        <nav className={styles.nav}>
          <Link
            to='/support'
            className={styles.navLink}
            onClick={(e) => e.preventDefault()}
          >
            Support
          </Link>
          <Link
            to='/download'
            className={styles.navLink}
            onClick={handleInstallClick}
          >
            Download
          </Link>
          <Separator />
          <Link
            to={username ? '/auth/logout' : '/auth/login'}
            className={`${styles.navLink} ${
              isLoading ? styles.disabled : ''
            }`}
            onClick={(e) => {
              if (username) {
                e.preventDefault();
                handleLogout();
              }
            }}
          >
            {
              isLoading
              ? <ButtonLoader loaderStyle='dark' />
              : username
              ? 'Log out'
              : 'Log in'
            }
          </Link>
          <Link
            to={username ? '/dashboard' : '/auth/signup'}
            className={`${styles.navLink} ${
              isLoading ? styles.disabled : ''
            }`}
          >
            {
              isLoading
              ? <ButtonLoader loaderStyle='dark' />
              : username
              ? 'Dashboard'
              : 'Get Started'
            }
          </Link>
        </nav>
      </section>
    </header>
  );
}
