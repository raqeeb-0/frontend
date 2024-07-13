import styles from './styles/DashboardLayout.module.css';
import { Outlet, useLoaderData } from 'react-router-dom';
import { TopNav } from '../components/app';


export const DashboardLayout = () => {
  const { isAuthenticated, username, orgs } = useLoaderData();

  return (
    <div className={styles.page}>
      <TopNav
        isAuthenticated={isAuthenticated}
        username={username}
        isEmptyList={orgs.length === 0}
      />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
