import { fetchApi } from '../utils/fetchApi';


export const rootLoader = async () => {
  const response = await fetchApi('get', '/users');

  if (response.status === 'success') {
    return {
      isAuthenticated: true,
      username: response.data.userName,
    };
  } else {
    return { isAuthenticated: false };
  }
}
