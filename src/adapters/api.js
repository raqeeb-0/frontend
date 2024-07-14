const url = process.env.REACT_APP_API_URL;
const options = {
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}
const delay = Math.floor(Math.random() * 2000) + 1000;

const api = {

  get: async (endpoint) => {
    await new Promise(resolve => setTimeout(resolve, delay));

    return fetch(`${url}/${endpoint}`, { ...options })
  },


  post: async (endpoint, body) => {
    //await new Promise(resolve => setTimeout(resolve, delay));

    return fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'POST',
      body: body && JSON.stringify(body),
    })
  },


  patch: async (endpoint, body) => {
    await new Promise(resolve => setTimeout(resolve, delay));

    return fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'PATCH',
      body: body && JSON.stringify(body),
    })
  },


  delete: async (endpoint) => {
    await new Promise(resolve => setTimeout(resolve, delay));

    return fetch(`${url}/${endpoint}`, {
      ...options,
      method: 'DELETE',
    })
  },

};


export { api };
