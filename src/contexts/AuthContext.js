import { useNavigate, useLocation } from 'react-router-dom';
import { createContext, useState } from 'react';
import { login, signup, logout } from '../services/auth';
import { getUser } from '../services/users';


const AuthContext = createContext({
  user: null,
  handleLogin: () => {},

});


const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  const handleLogin = (email, password) => {
    login(email, password)
      .then((result) => {
        if (result.status === 'success') {
          getUser()
            .then(({ data }) => {
              setUser(data);
            });
          navigate('/dashboard', { replace: true });
        }
      });
  }

  const value = { user, handleLogin };

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  );
}


export { AuthContext, AuthProvider };
