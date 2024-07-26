import styles  from './styles/Features.module.css';
import { motion } from 'framer-motion';
import { useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const Features = () => {

    const controls = useAnimation();
    const [ref, inView] = useInView();
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (inView && !hasAnimated) {
        controls.start({ opacity: 1 });
        setHasAnimated(true);
      }
    }, [controls, inView, hasAnimated]);
    

    return (
      <>
      <div className={styles.features}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <motion.h1 initial={{ opacity: 0 }} animate={controls} transition={{ duration: 0.5 }}>
        Feature Highlights
        </motion.h1>
        <motion.p
        className={styles.para}
        initial={{ opacity: 0 }}
        animate={controls}
        transition={{ duration: 1, delay: 0.5 }}
        >
        "Elevate Your Inventory Game: Explore Our Cutting-Edge Features"
        </motion.p>
      </div>
      <div className={styles.waves}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.wavesFill}></path>
          </svg>
      </div>
      <div className={styles.all} ref={ref}>
        <div className={styles.container}>
          <div
          className={styles.card}
          >
            <img src="./features/1.png" alt="icon" />
            <h2>01</h2>
            <h3>Inventory Management</h3>
            <p>Seamlessly manage your inventory with live updates on stock levels, sales, and alerts for low stock. Utilize advanced forecasting to predict future inventory needs and reduce overstock and stockouts.</p>
          </div>
          <div
          className={styles.card}
          >
            <img src="./features/2.png" alt="icon" />
            <h2>02</h2>
            <h3>Product Tracking</h3>
            <p>Monitor your products from entry to exit, ensuring complete visibility and control over your inventory lifecycle. Track product movements, shelf life, and location within the warehouse, improving accuracy and efficiency.</p>
          </div>
          <div
          className={styles.card}
          >
            <img src="./features/3.png" alt="icon" />
            <h2>03</h2>
            <h3>Order Management</h3>
            <p>Efficiently manage orders, track shipments, handle returns, and keep customers informed at every step. Automate order processing and fulfillment to reduce errors and speed up delivery times.</p>
          </div>
          <div
          className={styles.card}
          >
            <img src="./features/4.png" alt="icon" />
            <h2>04</h2>
            <h3>Supplier Management</h3>
            <p>Keep track of supplier details, orders, and performance metrics to maintain strong and reliable supplier relationships. Automate purchase orders, manage supplier contracts, and evaluate supplier performance with detailed analytics.</p>
          </div>
          <div
          className={styles.card}
          >
            <img src="./features/5.png" alt="icon" />
            <h2>05</h2>
            <h3>Customer Management</h3>
            <p>Manage customer information, track orders, and analyze purchasing behaviors to enhance customer satisfaction. Provide personalized service, automate marketing campaigns, and manage customer support requests efficiently.</p>
          </div>
          <div
          className={styles.card}
          >
            <img src="./features/6.png" alt="icon" />
            <h2>06</h2>
            <h3>Reporting & Analytics</h3>
            <p>Unlock powerful insights with advanced reporting tools. Track key metrics, identify trends, and make informed decisions with customizable dashboards and comprehensive reports.</p>
          </div>
        </div>
      </div>
      <div className={styles.anotherOne}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className={styles.anotherOneFill}></path>
          </svg>
        </div>
      </>
    );
};
