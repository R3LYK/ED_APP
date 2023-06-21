import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  // useEffect(() => {
  //   console.log("Require Auth:", auth); // Log the auth object
  //   console.log("Allowed Roles:", allowedRoles); // Log the allowedRoles array
  // }, [auth, allowedRoles]);
  // console.log("RequireAuth component rendering");
  // const authRoles = auth.roles;
  // console.log("authRoles:", authRoles);

  return (
    auth?.roles?.find((roles) => allowedRoles?.includes(roles))
      ? <Outlet />
      : auth?.user
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
