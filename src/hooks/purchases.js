import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deletePurchase,
  updatePurchase,
  createPurchase,
  getPurchase,
  getPurchases
} from '../services/purchases';


export const useGetPurchases = () => {
  const { handleResponse } = useResponseHandler();
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshPurchases = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getPurchases()
      .then((response) => {
        const success = () => {
          const refinedPurchases = response.data.map((purchase) => {
            return {
              'id': purchase.id,
              'ID': purchase.id,
              'material': purchase.material.name,
              'quantity': purchase.quantity,
              'price': purchase.price,
              'created at': purchase.createdAt.split('T')[0],
            };
          });
          setPurchases(refinedPurchases);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { purchases, isLoading, refreshPurchases };
}


export const useGetPurchase = () => {
  const { handleResponse } = useResponseHandler();
  const [purchase, setPurchase] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { purchaseId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPurchase(purchaseId)
      .then((response) => {
        const success = () => setPurchase(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { purchase, isLoading };
}


export const useCreatePurchase = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createPurchase(payload)
      .then((response) => {
        const success = () => navigate('/app/purchases');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdatePurchase = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { purchaseId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updatePurchase(purchaseId, payload)
      .then((response) => {
        const success = () => navigate('/app/purchases');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeletePurchase = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (purchaseId, refreshPurchases) => {
    setIsLoading(true);
    deletePurchase(purchaseId)
      .then((response) => {
        const success = () => navigate('/app/purchases');
        handleResponse(response, success);
        refreshPurchases();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
