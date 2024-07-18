import { api } from '../adapters/api';


const resource = 'org/materials';


export const getMaterials = () => api.get(resource);


export const getMaterial = (materialId) =>
  api.get(`${resource}/${materialId}`);


export const createMaterial = (payload) => {
  const { name, categoryId } = payload;

  return api.post(resource, { name, categoryId });
}


export const updateMaterial = (materialId, payload) => {
  const { name, categoryId } = payload;

  return api.patch(`${resource}/${materialId}`, { name, categoryId });
}


export const deleteMaterial = (materialId) =>
  api.delete(`${resource}/${materialId}`);
