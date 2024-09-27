import styles from './styles/HeroSection.module.css';
import { Link } from 'react-router-dom';
import { HeroImage } from './HeroImage.js';
import { LuMoveRight } from 'react-icons/lu';


export const HeroSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h1>
          effortlessly streamline and automate your
          <span className={styles.primary}> business </span>
          operations.
        </h1>
        <div className={styles.info}>
          <p>
            Our solution seamlessly integrates key processes, saving you time and boosting productivity.
          </p>
          <p>
            Simplify your daily tasks with smart automation, making your workflow more efficient and organized.
          </p>
        </div>
        <Link
          to='/auth/signup'
          className={styles.cta}
        >
          <span>get started</span><LuMoveRight />
        </Link>
      </div>
      <HeroImage />
    </section>
  );
}
