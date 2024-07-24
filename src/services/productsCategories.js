import { api } from '../adapters/api';


const resource = 'org/p/categories';


export const getProductsCategories = () => api.get(resource);


export const getProductsCategory = (categoryId) =>
  api.get(`${resource}/${categoryId}`);


export const createProductsCategory = (payload) => {
  const { name } = payload;

  return api.post(resource, { name });
}


export const updateProductsCategory = (categoryId, payload) => {
  const { name } = payload;

  return api.patch(`${resource}/${categoryId}`, { name });
}


export const deleteProductsCategory = (categoryId) =>
  api.delete(`${resource}/${categoryId}`);
