import styles from './styles/UserMenu.module.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';


export const UserMenu = (props) => {
  const { username } = props;
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
        <Link to='/logout' className={styles.navLink}>
          <BiLogOut
            className={styles.icon}
            style={{marginRight: '10px'}}
          />
          Log Out
        </Link>
      </div>
    </div>
  );
}
