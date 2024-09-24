import { createContext } from 'react';


export const AuthContext = createContext({
  username: '',
  isLoading: true,
  isInit: false,
  isAuthenticated: false,
  handleSignup: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  handleForgotPassword: () => {},
  handleResetPassword: () => {},
});

export const NotificationContext = createContext({
  message: '',
  type: '',
  refresh: 0,
  notify: () => {},
});
