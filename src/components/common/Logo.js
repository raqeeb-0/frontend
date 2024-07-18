import styles from './styles/Logo.module.css';
import { Link } from 'react-router-dom';

export const Logo = (props) => {
  const { imagePath, to } = props;
  return (
    <Link to={to}>
      <img
        src={process.env.PUBLIC_URL + imagePath}
        className={styles.image}
        width={128}
        height={64}
        alt='Logo'
      />
    </Link>
  );
}
