import styles from './styles/LCTA.module.css';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export const LCTA = () => {
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
    <>
    <div className={styles.topWave}>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.topWaveFill}></path>
      </svg>
    </div>
    <section className={styles.lcta} ref={containerRef}>
      <motion.div
        className={styles.lctaContent}
        initial="hidden"
        animate="visible"
        variants={variants}
        whileHover="hover"
      >
        <motion.h2
          className={styles.lctaHeading}
          initial="hidden"
          animate="visible"
          variants={heading}
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          className={styles.lctaSubHeading}
          initial="hidden"
          animate="visible"
          variants={subHeading}
        >
          create an account now.
        </motion.p>
        <motion.div
          className={styles.lctaButtons}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <button className={styles.lctaButton}>Create Account</button>
        </motion.div>
      </motion.div>
    </section>
    <div className={styles.bottomWave}>
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.topWaveFill}></path>
      </svg>
    </div>
    </>
  );
};
