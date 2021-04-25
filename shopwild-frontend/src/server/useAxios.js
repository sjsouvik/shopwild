import { useState, useEffect } from "react";

import serverRequests from "./serverRequests";
import { useData } from "../context/data-context";

const useAxios = (endpoint, type, dataToSend, propertyToInitialize) => {
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
            requestType: type,
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
          if (type === "get") {
            const {
              response: { data },
              error,
            } = await serverRequests({
              requestType: type,
              url: `${process.env.REACT_APP_BACKEND}/${endpoint}/607d92eee69f8b99745ef728`,
            });

            if (!error) {
              dispatch({
                type: "INITIALIZE_DATA",
                payload: { name: endpoint, data: data[endpoint].products },
              });
            }

            if (!error) {
              dispatch({ type: `MARK_${endpoint.toUpperCase()}_PRODUCTS` });
            }

            console.log(data[endpoint].products);
          } else if (type === "post") {
            const {
              response: { data },
              error,
            } = await serverRequests({
              requestType: type,
              url: `${process.env.REACT_APP_BACKEND}/${endpoint}/607d92eee69f8b99745ef728`,
              data: dataToSend,
            });
          }
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
