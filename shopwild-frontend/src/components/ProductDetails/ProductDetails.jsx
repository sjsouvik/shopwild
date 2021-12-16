import { useLocation, useNavigate } from "react-router-dom";

import "./ProductDetails.css";

import { useData } from "../../context/data-context";
import { useAuth } from "../../context/auth-context";

import Toast from "../Toast/Toast";
import { toastHandler, useDisableToast } from "../Toast/Toast";

import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "../../server/serverUpdate";

const ProductDetails = () => {
  const {
    state: { productId },
  } = useLocation();

  const navigate = useNavigate();

  const { state, dispatch } = useData();
  const { authToken, authUser } = useAuth();

  const product = state.allProducts.find((product) => product.id === productId);

  const isAddedToList = (list) => {
    return list.some(({ product }) => product.id === productId);
  };

  const removeFromWishlistHandler = () => {
    const isItemRemoved = removeFromWishlist(
      dispatch,
      product,
      authUser._id,
      authToken
    );

    if (isItemRemoved) {
      toastHandler(dispatch, "Removed from wishlist!");
    }
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "ADD TO CART") {
      if (!authToken) {
        return toastHandler(dispatch, "Login to add to Cart!");
      }

      const isItemAdded = addToCart(dispatch, product, authUser._id, authToken);
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
      if (!authToken) {
        return toastHandler(dispatch, "Login to add to Wishlist!");
      }

      const isItemAdded = addToWishlist(
        dispatch,
        product,
        authUser._id,
        authToken
      );
      if (isItemAdded) {
        toastHandler(dispatch, "Items has been wishlisted!");
      }
    }
  };

  useDisableToast();

  return (
    <div className="card product">
      <img src={product?.image} alt="product" className="product-image" />
      <div className="product-details">
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
          <button
            className="btn btn-primary btn-lg"
            onClick={clickHandler}
            data-testid="cartButton"
          >
            {authToken && isAddedToList(state.cart)
              ? "GO TO CART"
              : "ADD TO CART"}
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={wishlistHandler}
            data-testid="wishlistButton"
          >
            {authToken && isAddedToList(state.wishlist)
              ? "WISHLISTED"
              : "WISHLIST"}
          </button>
        </div>
      </div>

      <Toast />
    </div>
  );
};

export default ProductDetails;
