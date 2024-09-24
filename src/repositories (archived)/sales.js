import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteSale,
  updateSale,
  createSale,
  getSale,
  getSales
} from '../services/sales';


export const useGetSales = () => {
  const { handleResponse } = useResponseHandler();
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshSales = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getSales()
      .then((response) => {
        const success = () => {
          const refinedSales = response.data.map((sale) => {
            return {
              'id': sale.id,
              'ID': sale.id,
              'product': sale.product.name,
              'quantity': sale.quantity,
              'price': sale.price,
              'created at': sale.createdAt.split('T')[0],
            };
          });
          setSales(refinedSales);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { sales, isLoading, refreshSales };
}


export const useGetSale = () => {
  const { handleResponse } = useResponseHandler();
  const [sale, setSale] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { saleId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getSale(saleId)
      .then((response) => {
        const success = () => setSale(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sale, isLoading };
}


export const useCreateSale = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createSale(payload)
      .then((response) => {
        const success = () => navigate('/app/sales');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateSale = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { saleId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateSale(saleId, payload)
      .then((response) => {
        const success = () => navigate('/app/sales');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteSale = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (saleId, refreshSales) => {
    setIsLoading(true);
    deleteSale(saleId)
      .then((response) => {
        const success = () => navigate('/app/sales');
        handleResponse(response, success);
        refreshSales();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
