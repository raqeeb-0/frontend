import { fetchApi } from '../utils/fetchApi';


export const rootLoader = async () => {
  const response = await fetchApi('get', '/users');

  if ("error" in response) {
    throw new Response(
      response.error.message,
      { status: response.error.status }
    );
  }

  if (response.status === 'success') {
    return {
      isAuthenticated: true,
      username: response.data.userName,
    };
  } else {
    return { isAuthenticated: false };
  }
}
