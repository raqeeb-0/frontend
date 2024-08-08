import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResponseHandler } from './common';
import {
  deleteCustomer,
  updateCustomer,
  createCustomer,
  getCustomer,
  getCustomers
} from '../services/customers';


export const useGetCustomers = () => {
  const { handleResponse } = useResponseHandler();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const refreshCustomers = () => {
    setRefresh(!refresh);
  }

  useEffect(() => {
    setIsLoading(true);
    getCustomers()
      .then((response) => {
        const success = () => {
          const refinedCustomers = response.data.map((customer) => {
            return {
              'id': customer.id,
              'name': customer.name,
              'phone': customer.phone,
              'account receivable': customer.accountReceivable,
            };
          });
          setCustomers(refinedCustomers);
        }
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  return { customers, isLoading, refreshCustomers };
}


export const useGetCustomer = () => {
  const { handleResponse } = useResponseHandler();
  const [customer, setCustomer] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { customerId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getCustomer(customerId)
      .then((response) => {
        const success = () => setCustomer(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { customer, isLoading };
}


export const useCreateCustomer = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createCustomer(payload)
      .then((response) => {
        const success = () => navigate('/app/customers');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleCreate };
}


export const useUpdateCustomer = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { customerId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateCustomer(customerId, payload)
      .then((response) => {
        const success = () => navigate('/app/customers');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useDeleteCustomer = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (customerId, refreshCustomers) => {
    setIsLoading(true);
    deleteCustomer(customerId)
      .then((response) => {
        const success = () => navigate('/app/customers');
        handleResponse(response, success);
        refreshCustomers();
        setIsLoading(false);
      });
  }

  return { isLoading, handleDelete };
}
