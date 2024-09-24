import { Outlet } from 'react-router-dom';
import {
  AuthProvider,
  NotificationProvider
} from '../providers';
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
