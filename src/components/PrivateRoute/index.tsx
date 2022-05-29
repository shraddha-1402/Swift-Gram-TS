import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { LocalRoutes } from "../../constants";

const PrivateRoute = ({ authRoute = false }) => {
  const { token } = useAppSelector((store) => store.auth);

  if (authRoute) {
    return token ? (
      <Navigate replace={true} to={LocalRoutes.HOME} />
    ) : (
      <Outlet />
    );
  }
  return token ? <Outlet /> : <Navigate to={LocalRoutes.SIGNIN} />;
};

export { PrivateRoute };
