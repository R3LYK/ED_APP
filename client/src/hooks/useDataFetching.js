import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useDataFetching = (url, method = 'GET', userId, headers = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          let response;
  
          switch (method) {
            case 'GET':
              response = await axios.get(`${url}/${userId}`, {
                headers: { ...headers },
                withCredentials: true,
              });
              break;
            case 'POST':
              response = await axios.post(url, null, {
                headers: { ...headers },
                withCredentials: true,
              });
              break;
            case 'PUT':
              response = await axios.put(url, null, {
                headers: { ...headers },
                withCredentials: true,
              });
              break;
            case 'DELETE':
              response = await axios.delete(url, {
                headers: { ...headers },
                withCredentials: true,
              });
              break;
            default:
              throw new Error(`Invalid HTTP method: ${method}`);
          }
  
          setData(response.data);
          console.log(response.data);
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
  
  export default useDataFetching;
