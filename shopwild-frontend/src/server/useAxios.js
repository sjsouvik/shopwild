import { useState, useEffect } from "react";

import serverRequests from "./serverRequests";
import { useData } from "../context/data-context";
import { useAuth } from "../context/auth-context";

const useAxios = (endpoint, propertyToInitialize) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useData();
  const { authUser, authToken } = useAuth();

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (endpoint === "product") {
        const {
          response: { data },
          error,
        } = await serverRequests({
          requestType: "get",
          url: `${process.env.REACT_APP_BACKEND}/${endpoint}`,
        });

        if (!error) {
          dispatch({
            type: "INITIALIZE_DATA",
            payload: { name: propertyToInitialize, data: data[endpoint] },
          });
        }

        if (error) {
          setError(true);
        }
      } else {
        const {
          response: { data },
          error,
        } = await serverRequests({
          requestType: "get",
          url: `${process.env.REACT_APP_BACKEND}/${endpoint}/${authUser._id}`,
          token: { headers: { authorization: `Bearer ${authToken}` } },
        });

        if (!error) {
          dispatch({
            type: "INITIALIZE_DATA",
            payload: { name: endpoint, data: data[endpoint] },
          });
        }

        if (error) {
          setError(true);
        }
      }

      setLoading(false);
    })();
  }, []);

  return [loading, error];
};

export default useAxios;
