import { api } from '../adapters/api';


const resource = 'org/customers';


export const getCustomers = () => api.get(resource);


export const getCustomer = (customerId) =>
  api.get(`${resource}/${customerId}`);


export const createCustomer = (payload) => {
  const { name, phone } = payload;

  return api.post(resource, { name, phone });
}


export const updateCustomer = (customerId, payload) => {
  const { name, phone } = payload;

  return api.patch(`${resource}/${customerId}`, { name, phone });
}


export const deleteCustomer = (customerId) =>
  api.delete(`${resource}/${customerId}`);
