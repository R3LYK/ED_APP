import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useOnLoadFetch = (url, userId, headers = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${url}/${userId}`, {
          headers: { ...headers },
          withCredentials: true,
        });

        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useOnLoadFetch;
