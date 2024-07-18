import styles from './styles/SideNav.module.css';
import { NavLink } from 'react-router-dom';


export const SideNav = (props) => {
  const { paths, icons, linkNames } = props;

  const handleNavLink = (navLinkStates) => {
    const { isActive, isPending } = navLinkStates;
    const cssClass = isPending? styles.pending: isActive? styles.active: '';

    return `${cssClass} ${styles.link}`;
  }

  return (
    <nav>
      <ul className={styles.nav}>
        {paths.map((path, index) => {
          return (
            <NavLink
              to={path}
              key={path}
              className={handleNavLink}
              title={linkNames[index]}
            >
              { icons[index] }
              { linkNames[index] }
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
