import { useState, useEffect } from 'react';
import { useNotify } from './common';
import { getOrgs } from '../services/orgs';


export const useGetOrgs = () => {
  const { setMessage, setType, showNotification } = useNotify();
  const [orgs, setOrgs] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleErrorResponses = (response) => {
    if (response === undefined) {
      setMessage('Can\'t connect to the server');
      setType('error');
      showNotification();
    } else if (response.status === 'fail') {
      setMessage(response?.message);
      setType('error');
      response?.message && showNotification();
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getOrgs()
      .then((response) => {
        handleErrorResponses(response);
        if (response.status === 'success') {
          setOrgs(response.data);
        }
        setIsLoading(false);
      });
  }, []);

  return { orgs, error, isLoading };
}
