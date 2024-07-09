import styles from './styles/Notification.module.css';
import { IoClose } from "react-icons/io5";


export const Notification = ({ message, type, active, handleClose }) => {
  return (
    <div
      className={
`${styles.notification} \
${active? styles.active: ''} \
${type === 'error'? styles.error: styles.success}`
      }
    >
      <span className={styles.message}>{message}</span>
      <IoClose className={styles.closeIcon} onClick={handleClose} />
    </div>
  );
}
