import styles from './styles/EmptyListPlaceholder.module.css';
import { MdAddCircleOutline } from 'react-icons/md';
import { IconLink } from '../common';


export const EmptyListPlaceholder = (props) => {
  const { listName, isOutsideApp } = props;
  const path = isOutsideApp
    ?`/${listName}s/create`
    :`/app/${listName}s/create`;
  return (
    <div className={styles.empty}>
      <h1 className={styles.h1}>No { listName }s yet!</h1>
      <h3 className={styles.h2}>Try creating one to get started.</h3>
      <IconLink
        path={path}
        icon=<MdAddCircleOutline />
        name={`Create ${listName}`}
      />
    </div>
  );
}
