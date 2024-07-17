import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import { Notification } from '../components/common';


export const Root = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Notification />
        <Outlet />
      </AuthProvider>
    </NotificationProvider>
  );
}
