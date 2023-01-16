import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { NavigationRoutes } from "src/routes/ROUTES";
const useAuth = () => {
  let isLoggedIn = false;
  if (localStorage.getItem("jwt") != null) {
    isLoggedIn = true;
  }
  const user = { loggedIn: isLoggedIn };
  return user && user.loggedIn;
};

function ProtectedRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={NavigationRoutes.LOGIN} />;
}

export default ProtectedRoutes;
