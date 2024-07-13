import styles from './styles/IconNavLink.module.css';
import { Link } from 'react-router-dom';


export const IconNavLink = (props) => {
  const { path, name, icon } = props;
  return (
    <Link
      to={ path }
      className={styles.navLink}
    >
      <span className={styles.icon}>{ icon }</span>
      <span>{ name }</span>
    </Link>
  );
}
