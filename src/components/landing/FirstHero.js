import styles from './styles/FirstHero.module.css';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroVector } from './HeroVector.js';

export const FirstHero = () => {
  const containerRef = useRef(null);


  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div
          ref={containerRef}
          initial='hidden'
          animate='visible'
          exit='hidden'
          className={styles.heroVector}
        >
          <HeroVector />
        </div>

        <div
          initial="hidden"
          animate="visible"
          className={styles.textContainer}
        >
          <h1 className={styles.title}>
            Effortlessly Streamline and Automate Your Business Operations.
          </h1>
          <div
            initial="hidden"
            animate="visible"
            className={styles.text}
          >
            <p className={styles.text}>
              Our solution seamlessly integrates key processes, saving you time and boosting productivity. Simplify your daily tasks with smart automation, making your workflow more efficient and organized.
            </p>
            <div className={styles.buttonContainer}>
              <Link to={'/auth/signup'} className={styles.button}>
                Try It Now
              </Link>
              <div className={styles.checkContainer}>
                <img src='/check1.png' alt='check' className={styles.check} />
                <p className={styles.attract}>
                More than 5,000 businesses rely on us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
