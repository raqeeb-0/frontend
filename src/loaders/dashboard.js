import { fetchApi } from '../utils/fetchApi';


export const dashboardLoader = async ({ request }) => {
  const userResponse = await fetchApi('get', '/users', request.signal);
  const orgsResponse = await fetchApi('get', '/orgs', request.signal);

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
