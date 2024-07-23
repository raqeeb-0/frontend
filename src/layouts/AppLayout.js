import styles from './styles/AppLayout.module.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { RequireAuth } from '../components/auth';
import { Sidebar, TopNavApp, Page } from '../components/app';


export const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      localStorage.setItem('isSidebarOpen', false);
    } else {
      setIsSidebarOpen(true);
      localStorage.setItem('isSidebarOpen', true);
    }
  }

  return (
    <RequireAuth>
      <div className={styles.layout}>
        <Sidebar isOpen={isSidebarOpen} />
        <TopNavApp
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Page>
          <Outlet />
        </Page>
      </div>
    </RequireAuth>
  );
}
