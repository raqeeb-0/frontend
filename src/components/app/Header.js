import styles from './styles/Header.module.css';
import { PageHeader, IconLink } from '../common';
import { IoIosAdd } from 'react-icons/io';


export const Header = (props) => {
  const { value, isEmptyList, link } = props;
  return (
    <div className={styles.container}>
      <PageHeader value={ value } />
      {
        !isEmptyList &&
        <IconLink
          path={link.path}
          name={link.name}
          icon=<IoIosAdd />
          margin='48px 0px 28px auto'
        />
      }
    </div>
  );
}
