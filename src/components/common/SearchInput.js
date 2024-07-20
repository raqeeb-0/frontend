import styles from './styles/SearchInput.module.css';
import { IoSearch } from 'react-icons/io5';


export const SearchInput = (props) => {
  const { resourceName } = props;
  return (
    <label className={styles.searchContainer}>
      <IoSearch className={styles.searchIcon} />
      <input
        type='text'
        className={styles.searchInput}
        name='search'
        autoComplete='off'
        placeholder={`Search ${resourceName}`}
      />
    </label>
  );
}
