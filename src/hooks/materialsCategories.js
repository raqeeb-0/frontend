import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteMaterialsCategory,
  updateMaterialsCategory,
  createMaterialsCategory,
  getMaterialsCategory,
  getMaterialsCategories
} from '../services/materialsCategories';


export const useGetMaterialsCategories = () => {
  const { handleResponse } = useResponseHandler();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshCategories = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getMaterialsCategories()
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
  }, [refresh]);

  return { categories, isLoading, refreshCategories };
}


export const useGetMaterialsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getMaterialsCategory(categoryId)
      .then((response) => {
        const success = () => setCategory(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
  }, []);

  return { category, isLoading };
}


export const useCreateMaterialsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createMaterialsCategory(payload)
      .then((response) => {
        const success = () => navigate('/app/materials/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateMaterialsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateMaterialsCategory(categoryId, payload)
      .then((response) => {
        const success = () => navigate('/app/materials/categories');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteMaterialsCategory = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (categoryId, refreshCategories) => {
    setIsLoading(true);
    deleteMaterialsCategory(categoryId)
      .then((response) => {
        const success = () => navigate('/app/materials/categories');
        handleResponse(response, success);
        refreshCategories();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
