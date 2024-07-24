import { useNavigate, useLocation } from 'react-router-dom';
import { createContext, useState, useEffect } from 'react';
import { isLoggedIn, login, signup, logout } from '../services/auth';
import { useNotify } from '../hooks/common';


const AuthContext = createContext({
  username: '',
  isLoading: false,
  handleSignup: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setMessage, setType, showNotification } = useNotify();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const from = location.state?.from?.pathname || '/dashboard';

  const handleResponse = (response, redirect) => {
    if (response === undefined) {
      setMessage('Can\'t connect to the server');
      setType('error');
      showNotification();
    } else if (response.status === 'fail') {
      setMessage(response?.message);
      setType('error');
      response?.message && showNotification();
    } else if (response.status === 'success') {
      setMessage(response?.message);
      setType('success');
      response?.message && showNotification();
      setUsername(response.username);
      redirect && redirect();
    } else {
      console.log('Unhandled response');
    }
  }

  useEffect(() => {
    setIsLoading(true);
    isLoggedIn()
      .then((response) => {
        handleResponse(response);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignup = (payload) => {
    setIsLoading(true);
    signup(payload)
      .then((response) => {
        const redirect = () => navigate(from, { replace: true });
        handleResponse(response, redirect);
        setIsLoading(false);
      });
  }

  const handleLogin = (payload) => {
    setIsLoading(true);
    login(payload)
      .then((response) => {
        const redirect = () => navigate(from, { replace: true });
        handleResponse(response, redirect);
        setIsLoading(false);
      });
  }

  const handleLogout = () => {
    setIsLoading(true);
    logout()
      .then((response) => {
        handleResponse(response);
        setIsLoading(false);
      });
  }

  const value = {
    username,
    isLoading,
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


export { AuthContext, AuthProvider };
