import { useState, useEffect } from 'react';
import { AUTH_API } from '../lib/endpoints';
import { FetchAdapter } from '../adapters/fetchAdapter';
import { useResponseErrorHandler } from './useResponseErrorHandler';


const apiAdapter = new FetchAdapter(AUTH_API.REFRESH_TOKEN);

export const useGet = (endpoint) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { handleResponseError } = useResponseErrorHandler();

  const refresh = () => setReload(!reload);

  useEffect(() => {
    setError(null);
    setIsLoading(true);
    const fetchData = async () => {
      const response = await apiAdapter.get(
        endpoint,
        localStorage.getItem('token')
      );

      if (response.ok) {
        setData(response.data);
      } else {
        const { status, error } = response;

        handleResponseError({
          status: status,
          error: error
        });
        setError(error.message || 'Something went wrong');
      }
      setIsLoading(false);
    }

    fetchData();

  }, [endpoint, reload]);

  return { data, error, refresh, isLoading };
}

export const useCreate = (endpoint, callback) => {
  const [data, setData] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const { handleResponseError } = useResponseErrorHandler();

  const handleCreate = async (payload) => {
    setIsCreating(true);
    const response = await apiAdapter.post(
      endpoint,
      payload,
      localStorage.getItem('token')
    );

    if (response.ok) {
      setData(response.data);
      callback();
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }

    setIsCreating(false);
  }

  return { handleCreate, isCreating, data };
}

export const useUpdate = (endpoint, callback) => {
  const [data, setData] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { handleResponseError } = useResponseErrorHandler();

  const handleUpdate = async (payload) => {
    setIsUpdating(true);
    const response = await apiAdapter.patch(
      endpoint,
      payload,
      localStorage.getItem('token')
    );

    console.log(response);
    if (response.ok) {
      setData(response.data);
      callback();
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }

    setIsUpdating(false);
  }

  return { handleUpdate, isUpdating, data };
}

export const useDelete = (endpoint, callback) => {
  const [data, setData] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleResponseError } = useResponseErrorHandler();

  const handleDelete = async (e) => {
    setIsDeleting(true);
    const id = e.currentTarget.getAttribute('data-id');
    const response = await apiAdapter.delete(
      `${endpoint}/${id}`,
      localStorage.getItem('token')
    );

    if (response.ok) {
      setData(response.data);
      callback();
    } else {
      const { status, error } = response;

      handleResponseError({
        status: status,
        error: error
      });
    }

    setIsDeleting(false);
  }

  return { handleDelete, isDeleting, data };
}
