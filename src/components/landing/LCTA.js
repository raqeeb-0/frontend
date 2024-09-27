import styles from './styles/LCTA.module.css';
import { Link } from 'react-router-dom';
import { Wave1, Wave2 } from './Waves';


export const LCTA = () => {

  return (
    <section>
      <Wave2 />
      <div className={styles.content} >
        <h2>Ready to get started?</h2>
        <p>Give it a try.</p>
        <Link
          to='/auth/signup'
          className={styles.cta}
        >
          create account
        </Link>
      </div>
      <Wave2 turnOver={true} />
    </section>
  );
};
