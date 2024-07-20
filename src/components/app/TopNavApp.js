import styles from './styles/TopNavApp.module.css';
import { Hamburger, UserMenu } from '../common';


export const TopNavApp = (props) => {
  const {
    isSidebarOpen,
    toggleSidebar
  } = props;

  return (
    <header className={styles.topnav}>
      <Hamburger
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <UserMenu />
    </header>
  );
}
