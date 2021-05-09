import { useLocation, useNavigate } from "react-router-dom";

import "./ProductDetails.css";

import { useData } from "../../context/data-context";

import Toast from "../Toast/Toast";
import { toastHandler, useDisableToast } from "../Toast/Toast";

import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../../server/serverUpdate";

const ProductDetails = () => {
  const { state: productId } = useLocation();
  const navigate = useNavigate();

  const { state, dispatch } = useData();

  const product = state.allProducts.find((product) => product.id === productId);

  const isAddedToList = (list) => {
    return list.some(({ product }) => product.id === productId);
  };

  const removeFromWishlistHandler = () => {
    const isItemRemoved = removeFromWishlist(dispatch, product);

    if (isItemRemoved) {
      toastHandler(dispatch, "Removed from wishlist!");
    }
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "ADD TO CART") {
      const isItemAdded = addToCart(dispatch, product);
      if (isItemAdded) {
        toastHandler(dispatch, "Added to Cart!");
      }
    }

    if (e.target.textContent === "GO TO CART") {
      navigate("/cart");
    }
  };

  const wishlistHandler = () => {
    if (isAddedToList(state.wishlist)) {
      removeFromWishlistHandler();
    } else {
      const isItemAdded = addToWishlist(dispatch, product);
      if (isItemAdded) {
        toastHandler(dispatch, "Items has been wishlisted!");
      }
    }
  };

  useDisableToast();

  return (
    <div className="card product">
      <img src={product?.image} alt="image" className="product-image" />
      <div class="product-details">
        <b>
          <p className="brandname">{product?.brandName}</p>
        </b>
        <p>{product?.description}</p>
        <p>{product?.details}</p>
        <p className="price">
          <b>Rs. {product?.offeredPrice}</b>{" "}
          <s>
            <small>Rs. {product?.actualPrice}</small>
          </s>
          <span className="off">
            (
            {Math.round(
              ((product?.actualPrice - product?.offeredPrice) /
                product?.actualPrice) *
                100
            )}
            % off)
          </span>
        </p>
        <div style={{ textAlign: "left" }}>
          <button className="btn btn-primary btn-lg" onClick={clickHandler}>
            {isAddedToList(state.cart) ? "GO TO CART" : "ADD TO CART"}
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={wishlistHandler}
          >
            {isAddedToList(state.wishlist) ? "WISHLISTED" : "WISHLIST"}
          </button>
        </div>
      </div>

      <Toast />
    </div>
  );
};

export default ProductDetails;
