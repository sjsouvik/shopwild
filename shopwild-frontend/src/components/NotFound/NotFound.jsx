import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Oops! The page you're looking for, is not available</h2>
      <Link to="/">
        <button className="btn btn-primary">Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
