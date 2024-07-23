import styles from './styles/SideNav.module.css';
import { NavLink } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';


export const SideNav = (props) => {
  const { linksList, panelLink } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLink = (navLinkStates) => {
    const { isActive, isPending } = navLinkStates;
    const cssClass = isPending? styles.pending: isActive? styles.active: '';

    return `${cssClass} ${styles.link}`;
  }

  const togglePanel = () => isOpen? setIsOpen(false): setIsOpen(true);

  const opacityState = isOpen? styles.opacity100: styles.opacity20;

  const panelState = isOpen? '': styles.closed;

  return (
    <>
      <div className={styles.panelLink}>
        <NavLink
          to={panelLink.path}
          className={({isActive}) => isActive? styles.active: ''}
          onClick={(e) => {e.preventDefault(); togglePanel();}}
        >
          { panelLink.icon }{ panelLink.name } <span><IoIosArrowDown /></span>
        </NavLink>
      </div>
      <div className={`${styles.opacity} ${opacityState}`}>
        <div className={`${panelState}`}>
          <ul className={styles.list}>
            {linksList?.map((link, index) => {
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
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
