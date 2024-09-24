import { api } from '../adapters/api';


const resource = 'org/expenses';


export const getExpenses = () => api.get(resource);


export const getExpense = (expenseId) =>
  api.get(`${resource}/${expenseId}`);


export const createExpense = (payload) => {
  const { name, categoryId } = payload;

  return api.post(resource, { name, categoryId });
}


export const updateExpense = (expenseId, payload) => {
  const { name, categoryId } = payload;

  return api.patch(`${resource}/${expenseId}`, { name, categoryId });
}


export const deleteExpense = (expenseId) =>
  api.delete(`${resource}/${expenseId}`);
