import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteMaterial,
  updateMaterial,
  createMaterial,
  getMaterial,
  getMaterials
} from '../services/materials';


export const useGetMaterials = () => {
  const { handleResponse } = useResponseHandler();
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMaterials()
      .then((response) => {
        const success = () => {
          const refinedMaterials = response.data.map((material) => {
            return {
              'id': material.id,
              'name': material.name,
              'current price': material.currentPrice,
              'quantity': material.quantity,
              'category': material.categoryId,
              'notes': material.notes,
              'created at': material.createdAt.split('T')[0],
            };
          });
          setMaterials(refinedMaterials);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
  }, []);

  return { materials, isLoading };
}


export const useGetMaterial = () => {
  const { handleResponse } = useResponseHandler();
  const [material, setMaterial] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { materialId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getMaterial(materialId)
      .then((response) => {
        const success = () => setMaterial(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
  }, []);

  return { material, isLoading };
}


export const useCreateMaterial = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createMaterial(payload)
      .then((response) => {
        const success = () => navigate('/app/materials');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateOrg = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { materialId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateMaterial(materialId, payload)
      .then((response) => {
        const success = () => navigate('/app/materials');
        handleResponse(response);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteMaterial = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { materialId } = useParams();

  const handleDelete = (materialId) => {
    setIsLoading(true);
    deleteMaterial(materialId)
      .then((response) => {
        const success = () => navigate('/app/materials');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
