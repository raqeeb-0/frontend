import {
  lowercaseFirstLetter,
  uppercaseFirstLetter
} from '../lib/utils';
import { useNotify } from './';


export const useResponseErrorHandler = () => {
  const { notify } = useNotify();

  const handleResponseError = ({ status, error }) => {
    let errorMsg = error.message || 'Something went wrong!';

    if (status === 400) {
      error.field = uppercaseFirstLetter(error.field);
      error.message = lowercaseFirstLetter(error.message);

      errorMsg = `${error.field} ${error.message}`;
    }

    console.log(errorMsg);
    notify(errorMsg, 'error');
  }

  return { handleResponseError };
}
