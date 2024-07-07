import styles from './styles/Root.module.css';
import { Link } from 'react-router-dom';


export const Root = () => {
  return (
    <div>
      <header className={styles.header}>
        <Link to='/'>
          <img
            src={process.env.PUBLIC_URL + '/logo192name.png'}
            className={styles.logo}
            width={128}
            height={48}
            alt='Logo'
          />
        </Link>
        <nav>
          <Link to='/support'> Support </Link>
          <Link to='/download'> Download </Link>
          <Link to='/auth/login'> Log in </Link>
          <Link to='/auth/signup'> Sign up </Link>
        </nav>
      </header>
      <section>
      </section>
      <footer>
      </footer>
    </div>
  );
}
