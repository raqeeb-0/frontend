import styles from './styles/Notification.module.css';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { useNotify } from '../../hooks';


export const Notification = () => {
  const { message, type, refresh } = useNotify();
  const [isActive, setIsActive] = useState(false);
  const handleClose = () => setIsActive(false);

  useEffect(() => {
    let timer;
    if (refresh !== 0) {
      setIsActive(true);
      timer = setTimeout(() => setIsActive(false), 3000);
    }

    return () => clearTimeout(timer);
  }, [refresh]);

  return (
    <div
      className={
`${styles.notification} \
${isActive? styles.active: ''} \
${type === 'error'? styles.error: styles.success}`
      }
    >
      <span className={styles.message}>{ message }</span>
      <IoClose className={styles.closeIcon} onClick={handleClose} />
    </div>
  );
}
