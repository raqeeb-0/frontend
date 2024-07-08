const url = process.env.REACT_APP_API_URL + '/auth/user';

export const logIn = async (email, password) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  }

  try {
    const response = await fetch(
      `${url}/login`, options
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

export const isLoggedIn = async () => {
  try {
    const response = await fetch(
      `${url}/isLoggedIn`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
