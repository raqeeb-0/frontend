import { api } from '../adapters/api';


const resource = 'auth/users';


export const isLoggedIn = () => api.get(`${resource}/isLoggedIn`);


export const login = (payload) => {
  const { email, password } = payload;

  return api.post(
    `${resource}/login`,
    { email, password }
  );
}


export const signup = (payload) => {
  const { email, userName, phoneNumber, password } = payload;

  return api.post(
    `${resource}/signup`,
    { email, userName, phoneNumber, password }
  );
}


export const logout = () => api.get(`${resource}/logout`);
