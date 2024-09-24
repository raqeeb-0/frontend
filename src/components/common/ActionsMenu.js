import styles from './styles/ActionsMenu.module.css';
import { MdMoreHoriz } from 'react-icons/md';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';
import { MdOutlineDelete } from 'react-icons/md';
import { useOutsideClick } from '../../hooks';


export function ActionsMenu({ updatePath, data, handleDelete }) {
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef();
  const isActiveIcon = isVisible? styles.activeIcon: '';
  const isActiveMenu = isVisible? styles.active: styles.inactive;
  const handleIsVisible = () => {
    isVisible?
      setIsVisible(false):
      setIsVisible(true);
  }

  useOutsideClick({
    ref: menuRef,
    handler: () => setIsVisible(false),
  });

  return (
    <>
      <span
        className={`${styles.actionIcon} ${isActiveIcon}`}
        onClick={handleIsVisible}
        ref={menuRef}
      >
          <MdMoreHoriz />
      </span>
      <div className={`${styles.actionMenu} ${isActiveMenu}`} >
        <Link to={updatePath} className={styles.link}>
          <MdEdit className={styles.icon} /> Edit
        </Link>
        <Link
          onClick={handleDelete}
          data-id={data.id}
          className={`${styles.link} ${styles.danger}`}
        >
          <MdOutlineDelete  className={styles.icon}/> Delete
        </Link>
      </div>
    </>
  );
}
