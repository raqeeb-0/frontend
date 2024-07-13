import styles from './styles/EmptyListPlaceholder.module.css';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline } from 'react-icons/md';


export const EmptyListPlaceholder = (props) => {
  const { listName } = props;
  return (
    <div className={styles.empty}>
      <h1 className={styles.header}>You have no { listName }s yet!</h1>
      <h3 className={styles.header}>Try creating one to get started.</h3>
      <Link
        to={`/${listName}s/create`}
        className={styles.callToAction}
      >
        <span className={styles.icon}><MdAddCircleOutline /></span>
        <span>Create { listName }</span>
      </Link>
    </div>
  );
}
