import { useState, useEffect } from 'react';
import { getOrgs } from '../services/orgs';


export const useGetOrgs = () => {
  const [orgs, setOrgs] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getOrgs()
      .then(({ data }) => {
        setOrgs(data);
        setIsLoading(false);
      });
  }, [refresh]);

  const refreshOrgs = () => {
    setRefresh(!refresh);
  }

  return { orgs, refreshOrgs, error, isLoading };
}
