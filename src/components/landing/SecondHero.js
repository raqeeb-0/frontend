import styles  from './styles/SecondHero.module.css';
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


export const SecondHero = () => {
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
    blur: { filter: 'blur(10px)', transition: { duration: 4 } },
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 5, ease: "easeOut" } },
  };

  const subHeading = {
    blur: { filter: 'blur(10px)', transition: { duration: 4.5 } },
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 4, delay: 1, ease: "easeOut" } },
  };

  const list = {
    blur: { filter: 'blur(10px)', transition: { duration: 4 } },
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 3.5, delay: 2, ease: "easeOut" } },
  };

  return (
    <div className={styles.heroSection}>
      <div className={styles.wave}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.waveFill}></path>
          </svg>
      </div>
      <div className={styles.container}>
        <img className={styles.vector} src='/vector2.png' alt='hero vector' />

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ duration: 3 }}
          className={styles.content}
        >
          <motion.h1
          className={styles.heroTitle}
          initial='hidden'
          animate='visible'
          variants={heading}
          >
            Transform Your Business with Raqeeb ERP Solutions
          </motion.h1>
          <motion.p
          initial='hidden'
          animate='visible'
          variants={subHeading}
          className={styles.heroSubtitle}
          >
            Seamlessly manage your operations, increase efficiency, and achieve your business goals with our comprehensive ERP system.
            </motion.p>
          <motion.ul
          initial='hidden'
          animate='visible'
          variants={list}
          className={styles.heroList}
          >
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Centralize your data and streamline processes
            </li>
  
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Automate repetitive tasks and reduce errors
            </li>
  
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Improve productivity and save time
            </li>
  
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Enhance customer service and satisfaction
            </li>
  
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Access data anytime, anywhere
            </li>
  
            <li>
              <img src='./checklist.png' alt='checklist' className={styles.listStyle} />
              Customize features to meet your unique needs
            </li>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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
