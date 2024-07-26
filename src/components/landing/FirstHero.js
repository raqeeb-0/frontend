import styles from './styles/FirstHero.module.css';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeroVector } from './HeroVector.js';

export const FirstHero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } else {
            entry.target.classList.remove('show');
          }
        });
      },
      { threshold: 0.2 } 
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const variants = {
    blur: { filter: 'blur(10px)', transition: { duration: 1 } },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.5 } },
    hidden: { opacity: 0, scale: 0.95 }
  };

  const heading = {
    blur: { filter: 'blur(10px)', transition: { duration: 1.5 } },
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const subHeading = {
    blur: { filter: 'blur(10px)', transition: { duration: 1.5 } },
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };
  return (
    <div className={styles.heroSection}>
      <motion.div className={styles.container}>
        <motion.div
          ref={containerRef}
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={variants}
          className={styles.heroVector}
        >
          <HeroVector />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heading}
          className={styles.textContainer}
        >
          <h1 className={styles.title}>
            Effortlessly Streamline and Automate Your Business Operations.
          </h1>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={subHeading}
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
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
