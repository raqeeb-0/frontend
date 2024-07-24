import { api } from '../adapters/api';


const resource = 'org/suppliers';


export const getSuppliers = () => api.get(resource);


export const getSupplier = (supplierId) =>
  api.get(`${resource}/${supplierId}`);


export const createSupplier = (payload) => {
  const { name, phone } = payload;

  return api.post(resource, { name, phone });
}


export const updateSupplier = (supplierId, payload) => {
  const { name, phone } = payload;

  return api.patch(`${resource}/${supplierId}`, { name, phone });
}


export const deleteSupplier = (supplierId) =>
  api.delete(`${resource}/${supplierId}`);
