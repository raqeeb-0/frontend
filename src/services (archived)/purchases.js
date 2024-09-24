import { api } from '../adapters/api';


const resource = 'org/purchases';


export const getPurchases = () => api.get(resource);


export const getPurchase = (purchaseId) =>
  api.get(`${resource}/${purchaseId}`);


export const createPurchase = (payload) =>
  api.post(resource, payload);


export const updatePurchase = (purchaseId, payload) =>
  api.patch(`${resource}/${purchaseId}`, payload);


export const deletePurchase = (purchaseId) =>
  api.delete(`${resource}/${purchaseId}`);
