import styles from './styles/IconLink.module.css';
import { Link } from 'react-router-dom';


export const IconLink = (props) => {
  const { path, name, icon, margin } = props;
  return (
    <Link
      to={ path }
      className={styles.iconLink}
      style={{ margin }}
    >
      { icon }{ name }
    </Link>
  );
}
