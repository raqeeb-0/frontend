import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotify, useResponseHandler } from './common';
import {
  selectOrg,
  updateOrg,
  createOrg,
  getOrg,
  getOrgs
} from '../services/orgs';


export const useGetOrgs = () => {
  const { handleResponse } = useResponseHandler();
  const [orgs, setOrgs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOrgs()
      .then((response) => {
        const success = () => setOrgs(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
  }, []);

  return { orgs, isLoading };
}


export const useGetOrg = () => {
  const { handleResponse } = useResponseHandler();
  const [org, setOrg] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { orgId } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getOrg(orgId)
      .then((response) => {
        const success = () => setOrg(response.data);
        handleResponse(response, success);
        setIsLoading(false);
      });
  }, []);

  return { org, isLoading };
}


export const useCreateOrg = () => {
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (payload) => {
    setIsLoading(true);
    createOrg(payload)
      .then((response) => {
        const success = () => navigate('/dashboard');
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
  const { orgId } = useParams();

  const handleUpdate = (payload) => {
    setIsLoading(true);
    updateOrg(orgId, payload)
      .then((response) => {
        const success = () => navigate('/dashboard');
        handleResponse(response);
        setIsLoading(false);
      });
  }

  return { isLoading, handleUpdate };
}


export const useSelectOrg = () => {
  const { setMessage, setType, showNotification } = useNotify();
  const { handleResponse } = useResponseHandler();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSelectOrg = (orgId) => {
    setIsLoading(true);
    setMessage('Selecting organization ...');
    setType('info');
    showNotification();
    selectOrg(orgId)
      .then((response) => {
        const success = () => navigate('/app');
        handleResponse(response, success);
        setIsLoading(false);
      });
  }

  return { isLoading, handleSelectOrg };
}
