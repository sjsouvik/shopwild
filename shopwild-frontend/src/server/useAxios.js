import { useState, useEffect } from "react";

import serverRequests from "./serverRequests";
import { useData } from "../context/data-context";

const useAxios = (endpoint, propertyToInitialize) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { dispatch } = useData();

  useEffect(() => {
    (async () => {
      try {
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

          console.log(data[endpoint]);
        } else {
          const {
            response: { data },
            error,
          } = await serverRequests({
            requestType: "get",
            url: `${process.env.REACT_APP_BACKEND}/${endpoint}/607d92eee69f8b99745ef728`,
          });

          if (!error) {
            dispatch({
              type: "INITIALIZE_DATA",
              payload: { name: endpoint, data: data[endpoint].products },
            });
          }

          console.log(data[endpoint].products);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return [loading, error];
};

export default useAxios;
