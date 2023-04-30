import { Product, Loader, Toast } from "../../components";
import Empty from "../../assets/empty.svg";
import { useData } from "../../providers";
import { pluralize } from "../../helper";

const Wishlist = (props) => {
  const {
    state: { wishlist },
  } = useData();

  if (props.loading) {
    return <Loader />;
  }

  if (wishlist.length === 0) {
    return (
      <div>
        <h3>Your wishlist is empty :(</h3>
        <img src={Empty} alt="empty wishlist" height="300" width="300" />
      </div>
    );
  }

  return (
    <div>
      <h2>
        My Wishlist
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {` (${pluralize(wishlist.length, "item")})`}
        </span>
      </h2>
      <div className="card-row">
        {wishlist.map(({ product }) => (
          <Product key={product.id} {...product} buttonText="MOVE TO CART" />
        ))}
      </div>

      <Toast />
    </div>
  );
};

export default Wishlist;
