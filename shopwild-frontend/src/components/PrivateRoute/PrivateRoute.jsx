import { Navigate, Route } from "react-router-dom";

import { useAuth } from "../../context/auth-context";

const PrivateRoute = ({ path, ...props }) => {
  const { authToken } = useAuth();

  return (
    <div>
      {authToken ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </div>
  );
};

export default PrivateRoute;
