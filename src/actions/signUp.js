import { redirect } from 'react-router-dom';
import { fetchApi } from '../utils/fetchApi';


export const signUpAction = async ({ request }) => {
  const formData = await request.formData();
  const requestBody = Object.fromEntries(formData);
  const response = await fetchApi('post', '/auth/user/signup', requestBody);
  const error = {}

  if (response.status === 'success') {
    return redirect('/');
  } else {
    error.message = response.message
    return error;
  }
}
