import { redirect } from 'react-router-dom';
import { fetchApi } from '../utils/fetchApi';


export const logOutLoader = async () => {
  const response = await fetchApi('get', '/auth/users/logout');

  if (response.status === 'success') {
    return redirect('/');
  } else {
    return redirect('/');
  }
}
