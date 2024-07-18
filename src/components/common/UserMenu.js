import styles from './styles/UserMenu.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { ButtonLoader } from './ButtonLoader';
import { useAuth } from '../../hooks/common';


export const UserMenu = (props) => {
  //const { username, handleLogout } = props;
  const {
    username,
    handleLogout,
    isLoading
  } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef();
  const activeStatus = isVisible? styles.active: styles.inactive;
  const handleIsVisible = () => {
    isVisible?
      setIsVisible(false):
      setIsVisible(true);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
  }, [menuRef]);

  return (
    <div className={styles.container} ref={menuRef}>
      <span className={styles.user} onClick={handleIsVisible}>
        {username}
        <RiArrowDropDownLine className={styles.icon} />
      </span>
      <div className={`${styles.actionMenu} ${activeStatus}`} >
        <button
          onClick={handleLogout}
          className={`${styles.button} ${styles.danger}`}
          disabled={isLoading}
        >
          {
            isLoading
            ?<ButtonLoader
              loaderStyle='dark'
            />
            :<BiLogOut
              className={styles.icon}
            />
          }
          Log Out
        </button>
      </div>
    </div>
  );
}
