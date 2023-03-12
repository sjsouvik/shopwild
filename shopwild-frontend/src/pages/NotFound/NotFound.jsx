import { Link } from "react-router-dom";
import notFound from "../../assets/page_not_found.svg";

const NotFound = () => {
  return (
    <div>
      <img src={notFound} alt="404 page" height="300" width="300" />
      <h2>Oops! The page you're looking for, does not exist</h2>
      <Link to="/">
        <button className="btn btn-primary">Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
