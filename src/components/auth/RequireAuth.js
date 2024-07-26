import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useLayoutEffect, useContext } from 'react';
import { useAuth } from '../../hooks/common';
import { Loader } from '../../components/common';
import { AuthContext } from '../../contexts/AuthContext';


export const RequireAuth = ({ children }) => {
  const { isLoading, isInit, username } = useAuth();
  const location = useLocation();

  if (!isInit) {
    return <Loader />;
  }

  if (!username && !isLoading) {
    return <Navigate to='/auth/login' state={{ from: location }} />;
  }

  return children;
}
