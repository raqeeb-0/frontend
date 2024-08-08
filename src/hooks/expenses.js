import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteExpense,
  updateExpense,
  createExpense,
  getExpense,
  getExpenses
} from '../services/expenses';


export const useGetExpenses = () => {
  const { handleResponse } = useResponseHandler();
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshExpenses = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getExpenses()
      .then((response) => {
        const success = () => {
          const refinedExpenses = response.data.map((expense) => {
            return {
              'id': expense.id,
              'name': expense.name,
              'current price': expense.currentPrice,
              'category': expense.categoryName,
              'created at': expense.createdAt.split('T')[0],
            };
          });
          setExpenses(refinedExpenses);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { expenses, isLoading, refreshExpenses };
}


export const useGetExpense = () => {
  const { handleResponse } = useResponseHandler();
  const [expense, setExpense] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { expenseId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getExpense(expenseId)
      .then((response) => {
        const success = () => setExpense(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { expense, isLoading };
}


export const useCreateExpense = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createExpense(payload)
      .then((response) => {
        const success = () => navigate('/app/expenses/units');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateExpense = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { expenseId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateExpense(expenseId, payload)
      .then((response) => {
        const success = () => navigate('/app/expenses/units');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteExpense = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (expenseId, refreshExpenses) => {
    setIsLoading(true);
    deleteExpense(expenseId)
      .then((response) => {
        const success = () => navigate('/app/expenses/units');
        handleResponse(response, success);
        refreshExpenses();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
