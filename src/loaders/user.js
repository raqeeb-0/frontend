import { fetchApi } from '../utils/fetchApi';


export const userLoader = async ({ request }) => {
  const userResponse = await fetchApi('get', '/users', {}, request.signal);

  if ('error' in userResponse) {
    throw new Response(
      userResponse.error.message,
      { status: userResponse.error.status }
    );
  }

  if (userResponse.status === 'success') {
    return {
      isAuthenticated: true,
      username: userResponse.data.userName,
    };
  } else {
    return { isAuthenticated: false };
  }
}
