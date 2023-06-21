import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const LoginPersist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        console.log('in verifyRefreshToken')
        console.log(auth.accessToken);
        await refresh();
      } catch (err) {
        console.log('in verifyRefreshToken catch')
        //console.error(err);
      } finally {
        console.log('in verifyRefreshToken finally')
        setIsLoading(false);
      }
    }
    !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`roles: ${JSON.stringify(auth.roles)}`);
    console.log(`user: ${JSON.stringify(auth.uName)}`);
    console.log(`authToken: ${JSON.stringify(auth.accessToken)}`);
  }, [isLoading]);

  return (
    <>{isLoading ? <p>Loading...</p> : <Outlet />}</>
  )
}



export default LoginPersist;