import styles from './styles/Modal.module.css';
import { RiCloseLine } from 'react-icons/ri';
import { useModal } from '../../hooks/common';

export const Modal = () => {
  const { setIsOpen } = useModal();

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => console.log('close')}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => console.log('delete')}
              >
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => console.log('cancel')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
