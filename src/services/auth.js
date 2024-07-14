import { api } from '../adapters/api';


const resource = 'auth/users';


export const login = (email, password) =>
  api.post(`${resource}/login`, { email, password });


export const signup = (email, userName, phoneNumber, password) =>
  api.post(`${resource}/signup`, { email, userName, phoneNumber, password });


export const logout = () => api.get(`${resource}/logout`);
