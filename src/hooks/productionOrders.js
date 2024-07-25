import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteProductionOrder,
  updateProductionOrder,
  createProductionOrder,
  getProductionOrder,
  getProductionOrders
} from '../services/productionOrders';


export const useGetProductionOrders = () => {
  const { handleResponse } = useResponseHandler();
  const [productionOrders, setProductionOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshProductionOrders = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getProductionOrders()
      .then((response) => {
        const success = () => {
          const refinedProductionOrders = response.data.map((productionOrder) => {
            return {
              'id': productionOrder.id,
              'ID': productionOrder.id,
              'product': productionOrder.productId,
              'count': productionOrder.productCount,
              'status': productionOrder.status,
              'created at': productionOrder.createdAt.split('T')[0],
            };
          });
          setProductionOrders(refinedProductionOrders);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { productionOrders, isLoading, refreshProductionOrders };
}


export const useGetProductionOrder = () => {
  const { handleResponse } = useResponseHandler();
  const [productionOrder, setProductionOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productionOrderId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getProductionOrder(productionOrderId)
      .then((response) => {
        const success = () => setProductionOrder(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { productionOrder, isLoading };
}


export const useCreateProductionOrder = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createProductionOrder(payload)
      .then((response) => {
        const success = () => navigate('/app/production-orders');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateProductionOrder = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { productionOrderId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateProductionOrder(productionOrderId, payload)
      .then((response) => {
        const success = () => navigate('/app/production-orders');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteProductionOrder = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (productionOrderId, refreshProductionOrders) => {
    setIsLoading(true);
    deleteProductionOrder(productionOrderId)
      .then((response) => {
        const success = () => navigate('/app/production-orders');
        handleResponse(response, success);
        refreshProductionOrders();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
