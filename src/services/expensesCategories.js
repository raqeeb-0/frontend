import { api } from '../adapters/api';


const resource = 'org/e/categories';


export const getExpensesCategories = () => api.get(resource);


export const getExpensesCategory = (expenseId) =>
  api.get(`${resource}/${expenseId}`);


export const createExpensesCategory = (payload) => {
  const { name } = payload;

  return api.post(resource, { name });
}


export const updateExpensesCategory = (expenseId, payload) => {
  const { name } = payload;

  return api.patch(`${resource}/${expenseId}`, { name });
}


export const deleteExpensesCategory = (expenseId) =>
  api.delete(`${resource}/${expenseId}`);
