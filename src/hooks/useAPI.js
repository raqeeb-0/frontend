import { FetchAdapter } from '../adapters/fetchAdapter';
import { useState, useEffect } from 'react';
import { useNotify } from './common';

const apiAdapter = new FetchAdapter();

export const useGet = (endpoint) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const [data, setData] = useState(null);
  const { notify } = useNotify();

  const refresh = () => setReload(!reload);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const response = await apiAdapter.get(endpoint);

      if (response.ok) {
        setData(response.data);
      } else {
        notify(response.error, 'error');
      }

      setIsLoading(false);
    }

    fetchData();
  }, [reload]);

  return { data, refresh, isLoading };
}

export const useCreate = (endpoint, callback) => {
  const [isCreating, setIsCreating] = useState(false);
  const { notify } = useNotify();

  const handleCreate = async (payload) => {
    setIsCreating(true);
    const response = await apiAdapter.post(endpoint, payload);

    if (response.ok) {
      callback()
    } else {
      notify(response.error, 'error');
    }

    setIsCreating(false);
  }

  return { handleCreate, isCreating };
}

export const useUpdate = (endpoint, callback) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { notify } = useNotify();

  const handleUpdate = async (payload) => {
    setIsUpdating(true);
    const response = await apiAdapter.patch(endpoint, payload);

    if (response.ok) {
      callback();
    } else {
      notify(response.error, 'error');
    }

    setIsUpdating(false);
  }

  return { handleUpdate, isUpdating };
}

export const useDelete = (endpoint, callback) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { notify } = useNotify();

  const handleDelete = async (e) => {
    setIsDeleting(true);
    const id = e.currentTarget.getAttribute('data-id');
    const response = await apiAdapter.delete(`${endpoint}/${id}`);

    if (response.ok) {
      callback();
    } else {
      notify(response.error, 'error');
    }

    setIsDeleting(false);
  }

  return { handleDelete, isDeleting };
}
