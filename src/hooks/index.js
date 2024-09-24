import { useContext } from 'react';
import {
  NotificationContext,
  AuthContext,
} from '../providers/contexts';


export const useNotify = () => useContext(NotificationContext);
export const useAuth = () => useContext(AuthContext);
export { useForm } from './useForm';
export { useOutsideClick } from './useOutsideClick';
export { useBlockHeight } from './useBlockHeight';
export { useResponseErrorHandler } from './useResponseErrorHandler';
