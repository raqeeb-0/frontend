import { api } from '../adapters/api';


const resource = 'org/production';


export const getProductionOrders = () => api.get(resource);


export const getProductionOrder = (productionOrderId) =>
  api.get(`${resource}/${productionOrderId}`);


export const createProductionOrder = (payload) => {
  const { productId, productCount } = payload;

  return api.post(resource, { productId, productCount });
}


export const updateProductionOrder = (productionOrderId, payload) => {
  const { status } = payload;

  return api.patch(`${resource}/${productionOrderId}`, { status });
}


export const deleteProductionOrder = (productionOrderId) =>
  api.delete(`${resource}/${productionOrderId}`);
