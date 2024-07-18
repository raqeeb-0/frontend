import styles from './styles/SearchBox.module.css';
import { MdSearch } from 'react-icons/md';


export function SearchBox() {
  return (
    <div className={styles.input_wrapper}>
      <MdSearch className={styles.icon} />
      <input
        name='search_query'
        className={styles.input}
        placeholder='Search here...'
      />
    </div>
  );
}
