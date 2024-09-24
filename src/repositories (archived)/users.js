import { useState, useEffect } from 'react';
import { getUser } from '../services/users';


export const useGetUser = () => {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser()
      .then(({ data }) => {
        setUser(data);
        setIsLoading(false);
      });
  }, [refresh]);

  const refreshUser = () => {
    setRefresh(!refresh);
  };

  return { user, refreshUser, error, isLoading };
}
