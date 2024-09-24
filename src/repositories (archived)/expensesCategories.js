import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteExpensesCategory,
  updateExpensesCategory,
  createExpensesCategory,
  getExpensesCategory,
  getExpensesCategories
} from '../services/expensesCategories';


export const useGetExpensesCategories = () => {
  const { handleResponse } = useResponseHandler();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshCategories = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getExpensesCategories()
      .then((response) => {
        const success = () => {
          const refinedCategories = response.data.map((category) => {
            return {
              'id': category.id,
              'name': category.name,
            };
          });
          setCategories(refinedCategories);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { categories, isLoading, refreshCategories };
}


export const useGetExpensesCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getExpensesCategory(categoryId)
      .then((response) => {
        const success = () => setCategory(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { category, isLoading };
}


export const useCreateExpensesCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createExpensesCategory(payload)
      .then((response) => {
        const success = () => navigate('/app/expenses/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateExpensesCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateExpensesCategory(categoryId, payload)
      .then((response) => {
        const success = () => navigate('/app/expenses/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteExpensesCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (categoryId, refreshCategories) => {
    setIsLoading(true);
    deleteExpensesCategory(categoryId)
      .then((response) => {
        const success = () => navigate('/app/expenses/categories');
        handleResponse(response, success);
        refreshCategories();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
