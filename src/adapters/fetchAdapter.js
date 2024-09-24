export class FetchAdapter {
  constructor() {
    this.options = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async #fetchWithStatus(
    endpoint,
    customOptions = {},
    delaySwitch = false
  ) {

    const delay = Math.floor(Math.random() * 2000) + 1000;

    delaySwitch &&
      await new Promise(resolve => setTimeout(resolve, delay));

    try {
      const response = await fetch(endpoint, {
        ...this.options,
        ...customOptions,
      });
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

  get(endpoint) {
    return this.#fetchWithStatus(endpoint);
  }

  post(endpoint, data) {
    return this.#fetchWithStatus(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.#fetchWithStatus(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.#fetchWithStatus(endpoint, {
      method: 'DELETE',
    });
  }
}
