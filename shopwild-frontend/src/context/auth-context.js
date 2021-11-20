import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginWithCreds } from "../server/serverUpdate";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { token, user } = JSON.parse(localStorage?.getItem("login")) || {
    token: null,
    user: null,
  };

  const [authToken, setAuthToken] = useState(token);
  const [loginError, setLoginError] = useState(null);
  const [authUser, setAuthUser] = useState(user);

  const navigate = useNavigate();

  const setupAuthHeaderForServiceCalls = (token) => {
    if (token) {
      return (axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`);
    }

    delete axios.defaults.headers.common["Authorization"];
  };

  const setupAuthExceptionHandler = (logoutUser, navigate) => {
    const UNAUTHORIZED = 401;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === UNAUTHORIZED) {
          logoutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  };

  const login = async (email, password) => {
    const loginResponse = await loginWithCreds(email, password);

    if (loginResponse.error) {
      return setLoginError(loginResponse.message);
    }

    const { token, user } = loginResponse.data;
    setAuthToken(token);
    setAuthUser(user);

    localStorage?.setItem("login", JSON.stringify({ token, user }));
    // setupAuthHeaderForServiceCalls(token);
    navigate("/");
  };

  const logout = () => {
    localStorage?.removeItem("login");
    setAuthToken(null);
    // setupAuthHeaderForServiceCalls(null);
    navigate("/");
  };

  //   useEffect(() => {
  //     console.log("Token", token);
  //     token && setupAuthHeaderForServiceCalls(token);
  //     setupAuthExceptionHandler(logout, navigate);
  //   }, []);

  return (
    <AuthContext.Provider
      value={{ login, loginError, logout, authToken, authUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
