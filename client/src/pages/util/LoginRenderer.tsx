import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../routes/ROUTES";
const jwt = require("jsonwebtoken");
function LoginRenderer() {
  const navigate = useNavigate();
  //checks wheter the jw token stored on local storage is still active or not
  useEffect(() => {
    console.log("verifying jwt");
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();
      //if token expiry time is in the past set login state to false and remove token
      if (decodedToken.exp < dateNow.getTime()) {
        localStorage.removeItem("jwt");
        navigate(NavigationRoutes.LOGIN);
      } else {
        navigate(NavigationRoutes.HOME);
      }
    } else {
      navigate(NavigationRoutes.LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export default LoginRenderer;
