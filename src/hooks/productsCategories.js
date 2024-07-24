import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteProductsCategory,
  updateProductsCategory,
  createProductsCategory,
  getProductsCategory,
  getProductsCategories
} from '../services/productsCategories';


export const useGetProductsCategories = () => {
  const { handleResponse } = useResponseHandler();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshCategories = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getProductsCategories()
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


export const useGetProductsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductsCategory(categoryId)
      .then((response) => {
        const success = () => setCategory(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { category, isLoading };
}


export const useCreateProductsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createProductsCategory(payload)
      .then((response) => {
        const success = () => navigate('/app/products/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateProductsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateProductsCategory(categoryId, payload)
      .then((response) => {
        const success = () => navigate('/app/products/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteProductsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (categoryId, refreshCategories) => {
    setIsLoading(true);
    deleteProductsCategory(categoryId)
      .then((response) => {
        const success = () => navigate('/app/products/categories');
        handleResponse(response, success);
        refreshCategories();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
