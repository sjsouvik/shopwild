import Product from "../AllProducts/Product/Product";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import Empty from "../../assets/empty.svg";
import { useData } from "../../context";

const Wishlist = (props) => {
  const {
    state: { wishlist },
  } = useData();

  return (
    <div>
      <h2>
        My Wishlist{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {wishlist.length} item(s)
        </span>
      </h2>

      {props.loading ? (
        <Loader />
      ) : (
        <div>
          {wishlist.length === 0 && (
            <div>
              <h3>Wishlist is empty :(</h3>
              <img src={Empty} alt="empty wishlist" height="300" width="300" />
            </div>
          )}
          {wishlist.length > 0 && (
            <div className="card-row">
              {wishlist.map(({ product }) => (
                <Product
                  key={product.id}
                  {...product}
                  buttonText="MOVE TO CART"
                />
              ))}
            </div>
          )}
        </div>
      )}

      <Toast />
    </div>
  );
};

export default Wishlist;
