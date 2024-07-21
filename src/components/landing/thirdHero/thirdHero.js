import { motion } from 'framer-motion';
import styles  from './../styles/rdHero.module.css';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export const ThirdHero = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start({ opacity: 1 });
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);
  
  const heading = {
    blur: { filter: 'blur(10px)', transition: { duration: 3.5 } },
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 4 } },
  };

  const subHeading = {
    blur: { filter: 'blur(10px)', transition: { duration: 4 } },
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3.5 } },
  };

  const list = {
    blur: { filter: 'blur(10px)', transition: { duration: 4 } },
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3.5 } },
  };

  return (
    <div className={styles.section}>
      <div className={styles.topWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.topWaveFill}></path>
        </svg>
      </div>
      <div className={styles.container}>
      <motion.div
          className={styles.heroBg}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <img className={styles.vector} src='./mobile.png' alt='hero vector' />
        </motion.div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 2 }}
          className={styles.content}
        >
          <motion.h1
            className={styles.heroTitle}
            initial='hidden'
            animate='visible'
            variants={heading}
          >
            Optimize Your Business with Raqeeb ERP
          </motion.h1>
          <motion.p
            className={styles.heroSubTitle}
            initial='hidden'
            animate='visible'
            variants={subHeading}
          >
            Discover unparalleled efficiency and growth with our cutting-edge ERP solutions.
          </motion.p>
          <motion.ul
            className={styles.heroList}
            initial='hidden'
            animate='visible'
            variants={list}
          >
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Streamline your operations
            </li>
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Gain actionable insights
            </li>
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Boost productivity
            </li>
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Ensure data security
            </li>
            <br />
            <br />
            <br />
            <br />
          </motion.ul>
        </motion.div>
      </div>
      <div className={styles.bottomWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.bottomWaveFill}></path>
        </svg>
      </div>
    </div>
  )
}
