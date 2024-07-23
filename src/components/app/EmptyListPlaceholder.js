import styles from './styles/EmptyListPlaceholder.module.css';
import { MdAddCircleOutline } from 'react-icons/md';
import { IconLink } from '../common';


export const EmptyListPlaceholder = (props) => {
  const { listName, link } = props;
  return (
    <div className={styles.empty}>
      <h1 className={styles.h1}>No { listName } yet!</h1>
      <h3 className={styles.h2}>Try creating one to get started.</h3>
      <IconLink
        path={link.path}
        icon=<MdAddCircleOutline />
        name={link.name}
      />
    </div>
  );
}
