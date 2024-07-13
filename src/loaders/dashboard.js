import { fetchApi } from '../utils/fetchApi';


export const dashboardLoader = async () => {
  const userResponse = await fetchApi('get', '/users');
  const orgsResponse = await fetchApi('get', '/orgs');

  if ('error' in userResponse) {
    throw new Response(
      userResponse.error.message,
      { status: userResponse.error.status }
    );
  }

  if ('error' in orgsResponse) {
    throw new Response(
      orgsResponse.error.message,
      { status: orgsResponse.error.status }
    );
  }


  if (userResponse.status === 'success') {
    return {
      isAuthenticated: true,
      username: userResponse.data.userName,
      orgs: orgsResponse.data
    };
  } else {
    return { isAuthenticated: false };
  }
}
