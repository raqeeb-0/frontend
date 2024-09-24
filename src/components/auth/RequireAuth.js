import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { Loader } from '../../components/common';


export const RequireAuth = ({ children }) => {
  const { isLoading, isInit, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInit) {
    return <Loader />;
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to='/auth/login' state={{ from: location }} />;
  }

  return children;
}
