import { useState, useEffect } from "react";

import serverRequests from "./serverRequests";
import { useData } from "../context/data-context";
import { useAuth } from "../context/auth-context";

const useAxios = (endpoint, propertyToInitialize) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useData();
  const { authUser, authToken, logout } = useAuth();

  const getProducts = async () => {
    setLoading(true);

    if (endpoint === "product") {
      const { response, error } = await serverRequests({
        requestType: "get",
        url: `${process.env.REACT_APP_BACKEND}/${endpoint}`,
      });

      if (!error) {
        dispatch({
          type: "INITIALIZE_DATA",
          payload: {
            name: propertyToInitialize,
            data: response.data[endpoint],
          },
        });
      }

      if (error) {
        setError(true);
      }
    } else if (authToken) {
      const { response, error, statusCode } = await serverRequests({
        requestType: "get",
        url: `${process.env.REACT_APP_BACKEND}/${endpoint}/${authUser?._id}`,
        token: { headers: { authorization: `Bearer ${authToken}` } },
      });

      if (!error) {
        dispatch({
          type: "INITIALIZE_DATA",
          payload: { name: endpoint, data: response.data[endpoint] },
        });
      }

      if(statusCode === 401){
        return logout();
      }

      if (error) {
        setError(true);
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return [loading, error];
};

export default useAxios;
