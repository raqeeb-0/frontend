import styles from './styles/UserMenu.module.css';
import { useState, useRef } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import { ButtonLoader } from './ButtonLoader';
import { useAuth, useOutsideClick } from '../../hooks';


export const UserMenu = () => {
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

  useOutsideClick({
    ref: menuRef,
    handler: () => setIsVisible(false)
  });

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
