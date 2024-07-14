import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';


export const Root = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
