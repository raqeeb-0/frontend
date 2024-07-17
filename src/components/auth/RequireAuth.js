import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/common';


export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.username) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  return children;
}
