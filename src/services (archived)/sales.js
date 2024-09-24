import { api } from '../adapters/api';


const resource = 'org/sales';


export const getSales = () => api.get(resource);


export const getSale = (saleId) =>
  api.get(`${resource}/${saleId}`);


export const createSale = (payload) =>
  api.post(resource, payload);


export const updateSale = (saleId, payload) =>
  api.patch(`${resource}/${saleId}`, payload);


export const deleteSale = (saleId) =>
  api.delete(`${resource}/${saleId}`);
