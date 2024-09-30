export class FetchAdapter {
  constructor(refreshTokenEndpoint) {
    this.refreshTokenEndpoint = refreshTokenEndpoint;
    this.options = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    this.isRefreshingToken = false;
    this.refreshPromise = null;
  }

  async #fetchWithStatus(
    endpoint,
    customOptions = {},
    delaySwitch = false,
    retryCount = 0
  ) {

    const delay = Math.floor(Math.random() * 2000) + 1000;

    delaySwitch &&
      await new Promise(resolve => setTimeout(resolve, delay));

    const headers = {
      ...this.options.headers,
      ...customOptions.headers,
    };

    try {
      const response = await fetch(endpoint, {
        ...this.options,
        ...customOptions,
        headers
      });

      if (response.status === 403 && retryCount < 1) {
        const tokenRefreshed = await this.#handleTokenRefresh();

        if (tokenRefreshed) {
          customOptions.headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
          return this.#fetchWithStatus(endpoint, customOptions, delaySwitch, retryCount + 1);
        } else {
          return {
            status: 401,
            ok: false,
            data: null,
            error: {
              message: 'Failed to refresh token',
            },
          };
        }
      }

      const data = await response.json();

      return {
        status: response.status,
        ok: response.ok,
        data: data,
        error: data.error,
      };
    } catch (err) {
      if (err.message === 'Failed to fetch') {
        err.message = 'Couldn\'t connect to the server';
      }

      return {
        status: null,
        ok: false,
        data: null,
        error: {
          message: err.message,
        }
      };
    }
  }

  async #handleTokenRefresh() {
    if (this.isRefreshingToken) {
      return this.refreshPromise;
    }

    this.isRefreshingToken = true;
    this.refreshPromise = new Promise(async (resolve) => {
      try {
        const response = await fetch(this.refreshTokenEndpoint, {
          ...this.options,
          method: 'POST',
          body: JSON.stringify({
            refreshToken: localStorage.getItem('refresh_token')
          })
        });

        if (response.ok) {
          const { token, refreshToken } = await response.json();
          localStorage.setItem('token', token);
          localStorage.setItem('refresh_token', refreshToken);
          this.isRefreshingToken = false;
          resolve(true);
        } else {
          this.isRefreshingToken = false;
          resolve(false);
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.isRefreshingToken = false;
        resolve(false);
      }
    });

    return this.refreshPromise;
  }

  get(endpoint, authToken) {
    return this.#fetchWithStatus(endpoint, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  post(endpoint, data, authToken) {
    return this.#fetchWithStatus(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  patch(endpoint, data, authToken) {
    return this.#fetchWithStatus(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  delete(endpoint, authToken) {
    return this.#fetchWithStatus(endpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }
}
