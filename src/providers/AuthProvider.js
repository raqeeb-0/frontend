import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const isInit = useRef(false);
  
  const from = location.state?.from.pathname || '/organizations/overview';

  useEffect(() => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh_token');
    const username = localStorage.getItem('username');

    if (token || refreshToken || username) {
      setIsAuthenticated(true);
      setUsername(username);
    }

    isInit.current = true;
  }, []);

  const handleSignup = async (payload) => {
    setIsLoading(true);
    const response = await apiAdapter.post(AUTH_API.SIGNUP, payload);
    if (response.ok) {
      const { token, refreshToken, username } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUsername(username);
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
    console.log(response);
    if (response.ok) {
      const { token, refreshToken, username } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      setUsername(username);
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
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
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
    isInit: isInit.current,
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
