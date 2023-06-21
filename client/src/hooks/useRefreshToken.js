import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    //console.log('in useRefreshToken')
    const { setAuth } = useAuth();

    const refresh = async () => {
        //console.log('in refresh');
        const response = await axios.get('/refresh', { withCredentials: true });
        setAuth(prev => {
            // console.log('prev:', prev);
            // console.log('JSON.stringify(prev):')
            // console.log(JSON.stringify(prev));
            // console.log('response.data.accessToken:')
            // console.log(response.data.accessToken);
            return {...prev, roles: response.data.roles, accessToken: response.data.accessToken}
        });
        return response.data.accessToken;
    };
  return refresh
};

export default useRefreshToken
