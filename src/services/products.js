import { api } from '../adapters/api';


const resource = 'org/products';


export const getProducts = () => api.get(resource);


export const getProduct = (productId) =>
  api.get(`${resource}/${productId}`);


export const createProduct = (payload) =>
  api.post(resource, payload);


export const updateProduct = (productId, payload) =>
  api.patch(`${resource}/${productId}`, payload);


export const deleteProduct = (productId) =>
  api.delete(`${resource}/${productId}`);
