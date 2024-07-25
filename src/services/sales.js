import { api } from '../adapters/api';


const resource = 'org/sales';


export const getSales = () => api.get(resource);


export const getSale = (saleId) =>
  api.get(`${resource}/${saleId}`);


export const createSale = (payload) => {
  const { productId, quantity, total, customerId } = payload;

  return api.post(resource, { productId, quantity, total, customerId });
}


export const updateSale = (saleId, payload) => {
  const { status } = payload;

  return api.patch(`${resource}/${saleId}`, { status });
}


export const deleteSale = (saleId) =>
  api.delete(`${resource}/${saleId}`);
