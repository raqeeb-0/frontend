import { redirect } from 'react-router-dom';
import { fetchApi } from '../utils/fetchApi';


export const logInAction = async ({ request }) => {
  const formData = await request.formData();
  const requestBody = Object.fromEntries(formData);
  const response = await fetchApi('post', '/auth/users/login', requestBody);
  const error = {}

  if (response.status === 'success') {
    return redirect('/dashboard');
  } else {
    error.message = response.message
    return error;
  }
}
