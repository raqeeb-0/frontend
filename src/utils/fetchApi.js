export const fetchApi = async (method, resourcePath, requestBody) => {
  const url = `${process.env.REACT_APP_API_URL}${resourcePath}`;
  const options = {
    method: method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
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
