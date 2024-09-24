import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FetchAdapter } from '../adapters/fetchAdapter';
import { AUTH_API } from '../lib/endpoints';
import { useResponseErrorHandler } from '../hooks';
import { useNotify } from '../hooks';
import { AuthContext } from './contexts';


const apiAdapter = new FetchAdapter();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotify();
  const { handleResponseError } = useResponseErrorHandler();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [isInit, setIsInit] = useState(false);
  
  const from = location.state?.from.pathname || '/organizations/overview';

  useEffect(() => {
    setIsLoading(true);
    const checkAuthStatus = async () => {
      const response = await apiAdapter.get(AUTH_API.IS_LOGGEDIN);
      
      if (response.ok) {
        const { username } = response.data;
        setIsAuthenticated(true);
        setUsername(username);
        // NOTE: Implement redirect when the current path
        // is not the root path
      } else {
        response.status === null &&
        notify(response.error.message, 'error');
      }
      setIsInit(true);
      setIsLoading(false);
    }

    checkAuthStatus();
  }, []);

  const handleSignup = async (payload) => {
    setIsLoading(true);
    const response = await apiAdapter.post(AUTH_API.SIGNUP, payload);
    if (response.ok) {
      setIsAuthenticated(true);
      setUsername(response.data.username);
      navigate(from, { replace: true });
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }
    setIsLoading(false);
  }

  const handleLogin = async (payload) => {
    setIsLoading(true);
    const response = await apiAdapter.post(AUTH_API.LOGIN, payload);
    if (response.ok) {
      setIsAuthenticated(true);
      setUsername(response.data.username);
      navigate(from, { replace: true });
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }
    setIsLoading(false);
  }

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await apiAdapter.get(AUTH_API.LOGOUT);
    if (response.ok) {
      setIsAuthenticated(false);
      setUsername('');
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }
    setIsLoading(false);
  }

  const handleForgotPassword = async (payload) => {
    setIsLoading(true);
    const response = await apiAdapter.post(AUTH_API.FORGOT_PASSWORD, payload);
    if (response.ok) {
      // NOTE: Should implement a page to redirect to it
      // so that indicating success
      notify('Password reset token is being sent to your email');
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }
    setIsLoading(false);
  }

  const handleResetPassword = async (token, payload) => {
    setIsLoading(true);
    const response = await apiAdapter.post(
      AUTH_API.RESET_PASSWORD(token), payload
    );
    if (response.ok) {
      notify('Password updated successfully');
      navigate('/auth/login');
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }
    setIsLoading(false);
  }

  const value = {
    username,
    isLoading,
    isInit,
    isAuthenticated,
    handleResetPassword,
    handleForgotPassword,
    handleSignup,
    handleLogin,
    handleLogout
  };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}
