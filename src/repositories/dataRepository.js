import { FetchAdapter } from '../adapters/fetchAdapter';


export class DataRepository {
  constructor(endpoint, apiAdapter = new FetchAdapter()) {
    this.endpoint = endpoint;
    this.apiAdapter = apiAdapter;
  }

  async getAllItems() {
    return await this.apiAdapter.get(this.endpoint);
  }

  async getItem(id) {
    return await this.apiAdapter.get(`${this.endpoint}/${id}`);
  }

  async createItem(data) {
    return await this.apiAdapter.post(this.endpoint, data);
  }

  async updateItem(id, data) {
    return await this.apiAdapter.patch(`${this.endpoint}/${id}`, data);
  }

  async deleteItem(id) {
    return await this.apiAdapter.delete(`${this.endpoint}/${id}`);
  }
}
