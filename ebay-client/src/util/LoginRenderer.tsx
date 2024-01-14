import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../routes/ROUTES";
import jwt_decode from "jwt-decode";

function LoginRenderer() {
  const navigate = useNavigate();
  //checks whether the jw token stored on local storage is still active or not
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      var decodedToken: any = jwt_decode(token);
      var dateNow = new Date();
      //if token expiry time is in the past set login state to false and remove token
      if (decodedToken.exp < dateNow.getTime()) {
        localStorage.removeItem("jwt");
        navigate(NavigationRoutes.LOGIN);
      } else {
        navigate(NavigationRoutes.INTERNSHIPS);
      }
    } else {
      navigate(NavigationRoutes.INTERNSHIPS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default LoginRenderer;
