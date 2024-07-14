import { fetchApi } from '../utils/fetchApi';


export const orgsLoader = async ({ request }) => {
  const response = await fetchApi('get', '/orgs', {}, request.signal);

  if ('error' in response) {
    throw new Response(
      response.error.message,
      { status: response.error.status }
    );
  }


  if (response.status === 'success') {
    return {
      orgs: response.data
    };
  } else {
    return { isAuthenticated: false };
  }
}
