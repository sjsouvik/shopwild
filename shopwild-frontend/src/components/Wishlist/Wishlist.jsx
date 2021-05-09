import { useData } from "../../context/data-context";

import Product from "../AllProducts/Product/Product";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";

const Wishlist = (props) => {
  const value = useData();

  return (
    <div>
      <h2>
        My Wishlist{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {value.state.wishlist.length} item(s)
        </span>
      </h2>

      {props.loading ? (
        <Loader />
      ) : (
        <div className="card-row">
          {value.state.wishlist.map(({ product }) => (
            <Product key={product.id} {...product} buttonText="MOVE TO CART" />
          ))}
        </div>
      )}

      <Toast />
    </div>
  );
};

export default Wishlist;
