const url = process.env.REACT_APP_API_URL;
const options = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}
const delay = Math.floor(Math.random() * 2000) + 1000;

const tryCatchWrapper = async (func) => {
  try {
    const response = await func();

    if (response !== undefined) {
      return await response.json();
    }
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      console.log('Cant\'t connect to the server');
    } else {
      console.error(err);
    }
  }
}

const api = {

  get: async (endpoint) => {
    //await new Promise(resolve => setTimeout(resolve, delay));

    const fetchData = () => fetch(`${url}/${endpoint}`, { ...options });

    return await tryCatchWrapper(fetchData);
  },


  post: async (endpoint, body) => {
    //await new Promise(resolve => setTimeout(resolve, delay));

    const fetchData = () => fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'POST',
      body: body && JSON.stringify(body),
    });

    return await tryCatchWrapper(fetchData);
  },


  patch: async (endpoint, body) => {
    //await new Promise(resolve => setTimeout(resolve, delay));

    const fetchData = () => fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'PATCH',
      body: body && JSON.stringify(body),
    });

    return await tryCatchWrapper(fetchData);
  },


  delete: async (endpoint) => {
    //await new Promise(resolve => setTimeout(resolve, delay));

    const fetchData = () => fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'DELETE',
    });

    return await tryCatchWrapper(fetchData);
  },

};


export { api };
