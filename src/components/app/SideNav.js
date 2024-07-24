import styles from './styles/SideNav.module.css';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';


export const SideNav = (props) => {
  const { panelList, panelLink } = props;
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => isOpen? setIsOpen(false): setIsOpen(true);

  const handlePanelLink = ({ isActive }) => {
    const activeClass = isActive? styles.active: '';
    const openedClass = isOpen? styles.opened: '';
    return `${activeClass} ${openedClass}`;
  }

  const handleNavLink = ({ isActive }) => {
    const activeClass = isActive? styles.active: '';
    return `${activeClass} ${styles.link}`;
  }

  const opacityState = isOpen? styles.opacity100: styles.opacity20;

  const panelState = isOpen? '': styles.closed;

  return (
    <>
      <div className={styles.panelLink}>
        <NavLink
          to={panelLink.path}
          className={handlePanelLink}
          onClick={(e) => {e.preventDefault(); togglePanel();}}
        >
          { panelLink.icon }{ panelLink.name } <span><IoIosArrowDown /></span>
        </NavLink>
      </div>
      <div className={`${styles.opacity} ${opacityState}`}>
        <div className={`${panelState}`}>
          <ul className={styles.list}>
            {
              panelList?.map((link, index) => {
                return (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={handleNavLink}
                      title={link.name}
                    >
                      { link.name }
                    </NavLink>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    </>
  );
}
