import styles from './styles/SideNav.module.css';
import { NavLink } from 'react-router-dom';
import { LuChevronDown } from 'react-icons/lu';
import { useState, useEffect, useRef } from 'react';


export const SideNav = (props) => {
  const { panelList, panelHeader, isActive, onClick } = props;

  const [panelHeight, setPanelHeight] = useState(0);
  const panelRef = useRef();
  const firstLinkRef = useRef();

  useEffect(() => {
    if (isActive && firstLinkRef.current) {
      setPanelHeight(panelRef.current.scrollHeight);
      firstLinkRef.current.click();
    } else {
      setPanelHeight(0);
    }
  }, [isActive]);

  const handleNavLinkStyle = ({ isActive }) => {
    const activeClass = isActive? styles.active: '';
    return `${activeClass} ${styles.link}`;
  }

  const assignRef = (index) => !index && { ref: firstLinkRef };

  return (
    <div className={`${styles.container} ${isActive? styles.activeContainer : ''}`}>
      <div
        className={styles.panelHeader}
        title={panelHeader.title}
        onClick={onClick}
      >
        <span>{ panelHeader.icon }</span>
        <span>{ panelHeader.title }</span>
        <span className={`${isActive ? styles.rotate : ''}`}>
          <LuChevronDown />
        </span>
      </div>
      <div
        ref={panelRef}
        className={styles.panel}
        style={{ height: `${panelHeight}px`}}
      >
        <ul className={styles.list}>
          {
            panelList?.map((link, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={handleNavLinkStyle}
                    title={link.name}
                    {...assignRef(index)}
                  >
                    { link.icon }{ link.name }
                  </NavLink>
                </li>
              );
            })
          }
        </ul>
      </div>
    </div>
  );
}
