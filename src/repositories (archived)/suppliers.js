import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteSupplier,
  updateSupplier,
  createSupplier,
  getSupplier,
  getSuppliers
} from '../services/suppliers';


export const useGetSuppliers = () => {
  const { handleResponse } = useResponseHandler();
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshSuppliers = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getSuppliers()
      .then((response) => {
        const success = () => {
          const refinedSuppliers = response.data.map((supplier) => {
            return {
              'id': supplier.id,
              'name': supplier.name,
              'phone': supplier.phone,
              'account payable': supplier.accountPayable,
            };
          });
          setSuppliers(refinedSuppliers);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { suppliers, isLoading, refreshSuppliers };
}


export const useGetSupplier = () => {
  const { handleResponse } = useResponseHandler();
  const [supplier, setSupplier] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { supplierId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSupplier(supplierId)
      .then((response) => {
        const success = () => setSupplier(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { supplier, isLoading };
}


export const useCreateSupplier = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createSupplier(payload)
      .then((response) => {
        const success = () => navigate('/app/suppliers');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateSupplier = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { supplierId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateSupplier(supplierId, payload)
      .then((response) => {
        const success = () => navigate('/app/suppliers');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteSupplier = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (supplierId, refreshMaterials) => {
    setIsLoading(true);
    deleteSupplier(supplierId)
      .then((response) => {
        const success = () => navigate('/app/suppliers');
        handleResponse(response, success);
        refreshMaterials();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
