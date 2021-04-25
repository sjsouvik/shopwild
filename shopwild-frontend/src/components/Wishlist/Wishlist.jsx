import { useState } from "react";
import { useData } from "../../context/data-context";

import Product from "../AllProducts/Product/Product";
import Toast from "../Toast/Toast";

import useAxios from "../../server/useAxios";

const Wishlist = () => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const value = useData();

  const [isWishlistLoading, wishlistLoadingError] = useAxios(
    "wishlist",
    "get",
    null,
    null
  );

  return (
    <div>
      <h2>
        My Wishlist{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {value.state.wishlist.filter((item) => item.isWishlisted).length}{" "}
          item(s)
        </span>
      </h2>

      <div className="card-row">
        {value.state.wishlist.map(
          ({ product, isWishlisted }) =>
            isWishlisted && (
              <Product
                key={product.id}
                id={product.id}
                title={product.brandName}
                description={product.description}
                image={product.image}
                offeredPrice={product.offeredPrice}
                actualPrice={product.actualPrice}
                discount={product.discount}
                buttonText="MOVE TO CART"
                setToast={setToast}
                setToastMessage={setToastMessage}
              />
            )
        )}
      </div>

      <Toast show={toast} message={toastMessage} />
    </div>
  );
};

export default Wishlist;
