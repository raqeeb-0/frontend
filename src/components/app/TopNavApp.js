import styles from './styles/TopNavApp.module.css';
import { Hamburger, UserMenu } from '../common';
import { useAuth } from '../../hooks/common';
//import { SearchBox } from './SearchBox';


export const TopNavApp = (props) => {
  const {
    isSidebarOpen,
    toggleSidebar
  } = props;
  const { username, handleLogout } = useAuth();

  return (
    <header className={styles.topnav}>
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    {/*<SearchBox />*/}
      <UserMenu
        username={username}
        handleLogout={handleLogout}
      />
    </header>
  );
}
