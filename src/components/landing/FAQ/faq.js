import { motion } from 'framer-motion';
import styles from './../styles/faq.module.css';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export const FAQ = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start('visible');
      setHasAnimated(true);
    }
  }, [controls, inView, hasAnimated]);

  const heading = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 3 } },
  };

  const subHeading = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.5 } },
  };

  const list = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 2.5 } },
  };

  return (
    <div className={styles.faq}>
      <div className={styles.topWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.topWaveFill}></path>
        </svg>
      </div>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={heading}
          className={styles.headingContainer}
        >
          <h1>Frequently Asked Questions</h1>
          <Link to="/auth/signup" className={styles.getStarted}>
            <p>Get Started</p>
            <img src='./whiteShare.png' alt='share' className={styles.shareIcon}/>
          </Link>
        </motion.div>
        <motion.p
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={subHeading}
          className={styles.subHeading}
        >
          Quick answers to questions you may have. Can't find what you're looking for? Check out our <a href="#" className={styles.linkText}>full documentation</a>.
        </motion.p>
        <motion.div
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={list}
          className={styles.allQuestions}
        >
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={listItem}
            className={styles.container1}
          >
            <motion.ul
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={list}
            className={styles.list}
            >
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./gears.png' alt='gears' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>What is Raqeeb?</h3>
                  <p>Raqeeb is an advanced ERP inventory system designed to streamline and optimize inventory management for businesses. It helps you track and manage your inventory, purchases, and expenses efficiently.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./inventory.png' alt='inventory' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>How does Raqeeb improve inventory management?</h3>
                  <p>Raqeeb offers real-time tracking of inventory levels, automated reorder notifications, and detailed reporting on inventory usage and trends. This helps you reduce stockouts, overstocking, and optimize inventory costs.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./small.png' alt='small' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>Is Raqeeb suitable for small businesses?</h3>
                  <p>Yes, Raqeeb is designed to be scalable and flexible, making it suitable for businesses of all sizes. Whether you’re a small business or a large enterprise, Raqeeb can be customized to meet your specific needs.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./secure.png' alt='secure' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>How secure is my data with Raqeeb?</h3>
                  <p>Raqeeb prioritizes data security with robust encryption protocols, secure access controls, and regular security updates. Your data is stored in secure servers with backup mechanisms in place to prevent data loss.</p>
                </div>
              </div>
            </motion.li>
          </motion.ul>
          </motion.div>
          <motion.div
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={listItem}
            className={styles.container1}
          >
            <motion.ul
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={list}
            className={styles.list}
            >
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./support.png' alt='support' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>What kind of support does Raqeeb offer?</h3>
                  <p>We offer comprehensive support including online documentation, email support, and live chat assistance. Our support team is available to help you with any questions or issues you may encounter.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./rocket.png' alt='get start' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>How can I get started with Raqeeb?</h3>
                  <p>To get started with Raqeeb, simply sign up for a free trial or contact our sales team for a demo. We’ll guide you through the setup process and help you configure the system to fit your business needs.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./offer.png' alt='pricing' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>What is the pricing model for Raqeeb?</h3>
                  <p>Raqeeb offers flexible pricing plans based on your business size and requirements. For detailed pricing information, please visit our pricing page or contact our sales team for a customized quote.</p>
                </div>
              </div>
            </motion.li>
            <motion.li variants={listItem} className={styles.listItem}>
              <div className={styles.listItemContainer}>
                <div className={styles.icon}>
                  <img src='./features.png' alt='features' className={styles.iconImage}/>
                </div>
                <div className={styles.listItemText}>
                  <h3>Can I request a feature or provide feedback?</h3>
                  <p>Absolutely! We welcome feedback and feature requests from our users. You can submit your suggestions through our feedback portal or contact our support team directly.</p>
                </div>
              </div>
            </motion.li>
          </motion.ul>
          </motion.div>
        </motion.div>
        <motion.div 
          className={styles.contact}
          ref={ref}
          animate={controls}
          initial="hidden"
          variants={listItem}
          >
            <div className={styles.contactContainer}>
              <div className={styles.supportDiv}>
                <img src='./supportGirl.png' alt='support' className={styles.supportImage}/>
              </div>
              <div className={styles.contactText}>
                <h2>Need help?</h2>
                <p>Our support team is here to help you with any questions or issues you may have. Contact us for assistance or check out our documentation for more information.</p>
              </div>
              <Link to="#" className={styles.docs}>
                Documentation
                <img src='./share.png' alt='share' className={styles.shareIcon}/>
              </Link>
              <Link to="#" className={styles.contactUs}>Contact Us</Link>
            </div>
          </motion.div>
      </div>
      <div className={styles.bottomWave}>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.bottomWaveFill}></path>
        </svg>
      </div>
    </div>
  );
}
