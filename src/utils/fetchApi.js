export const fetchApi = async (method, resourcePath, requestBody, signal, delay=0) => {
  const url = `${process.env.REACT_APP_API_URL}${resourcePath}`;
  const abortController = new AbortController();
  const abortSignal = signal || abortController.signal;
  const options = {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'get'? JSON.stringify(requestBody): undefined
  }

  try {
    await new Promise(resolve => setTimeout(resolve, delay));

    const response = await fetch(url, options);

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          message: response.statusText
        }
      }
    }
    const data = await response.json();

    return data;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Request aborted');
    } else if (err.message === 'Failed to fetch') {
      return {
        error: {
          status: 503,
          message: 'Network Error: Failed to fetch data'
        }
      }
    } else {
      console.error(err);
    }
  }
}
