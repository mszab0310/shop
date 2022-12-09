import React, { useEffect } from "react";
import { useState } from "react";
import LoginPage from "../auth/Login";
import HomePage from "../home/HomePage";
const jwt = require("jsonwebtoken");
function LoginRenderer() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  //checks wheter the jw token stored on local storage is still active or not
  useEffect(() => {
    console.log("verifying jwt");
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      var decodedToken = jwt.decode(token, { complete: true });
      var dateNow = new Date();
      //if token expiry time is in the past set login state to false and remove token
      if (decodedToken.exp < dateNow.getTime()) {
        setIsLogin(false);
        localStorage.removeItem("jwt");
      } else setIsLogin(true);
    }
  }, []);

  return <div>{isLogin ? <HomePage /> : <LoginPage />}</div>;
}

export default LoginRenderer;
