import {
  lowercaseFirstLetter,
  uppercaseFirstLetter
} from '../lib/utils';
import { useNotify, useAuth } from './';


export const useResponseErrorHandler = () => {
  const { notify } = useNotify();
  const { handleLogout } = useAuth();

  const handleResponseError = ({ status, error }) => {
    let errorMsg = error.message || 'Something went wrong!';

    if (status === 400) {
      error.field = uppercaseFirstLetter(error.field);
      error.message = lowercaseFirstLetter(error.message);

      errorMsg = `${error.field} ${error.message}`;
    }

    if (status === 401) {
      handleLogout();
    }

    console.log(error);
    notify(errorMsg, 'error');
  }

  return { handleResponseError };
}
