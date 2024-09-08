export class FetchAdapter {
  constructor(baseUrl = process.env.REACT_APP_API_URL) {
    this.baseUrl = baseUrl;
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
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        ...this.options,
        ...customOptions,
      });
      const data = await response.json();

      return {
        status: response.status,
        ok: response.ok,
        data: data.data,
        error: data.message,
      };
    } catch (err) {
      return {
        status: null,
        ok: false,
        error: err.message,
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
