import { fetchApi } from '../utils/fetchApi';


export const getUser = async (signal) => {
  const userResponse = await fetchApi('get', '/users', signal);

  return userResponse;
}
