import { api } from '../adapters/api';


const resource = 'org/m/categories';


export const getMaterialsCategories = () => api.get(resource);


export const getMaterialsCategory = (categoryId) =>
  api.get(`${resource}/${categoryId}`);


export const createMaterialsCategory = (payload) => {
  const { name } = payload;

  return api.post(resource, { name });
}


export const updateMaterialsCategory = (categoryId, payload) => {
  const { name } = payload;

  return api.patch(`${resource}/${categoryId}`, { name });
}


export const deleteMaterialsCategory = (categoryId) =>
  api.delete(`${resource}/${categoryId}`);
