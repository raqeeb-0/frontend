import { api } from '../adapters/api';


const resource = 'org/purchases';


export const getPurchases = () => api.get(resource);


export const getPurchase = (purchaseId) =>
  api.get(`${resource}/${purchaseId}`);


export const createPurchase = (payload) => {
  const { name, categoryId } = payload;

  return api.post(resource, { name, categoryId });
}


export const updatePurchase = (materialId, payload) => {
  const { name, categoryId } = payload;

  return api.patch(`${resource}/${materialId}`, { name, categoryId });
}


export const deletePurchase = (materialId) =>
  api.delete(`${resource}/${materialId}`);
