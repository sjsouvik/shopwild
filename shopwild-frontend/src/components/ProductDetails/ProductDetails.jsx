import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./ProductDetails.css";

import { useData } from "../../context/data-context";

import Toast from "../Toast/Toast";

const ProductDetails = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const { state: productId } = useLocation();
  const navigate = useNavigate();

  const { state, dispatch } = useData();

  const utilToast = (message) => {
    setShowToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const removeFromWishlistHandler = () => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    utilToast("Removed from wishlist!");
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "ADD TO CART") {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, qty: 1 } });
      utilToast("Added to Cart!");
    }

    if (e.target.textContent === "GO TO CART") {
      navigate("/cart");
    }
  };

  const wishlistHandler = () => {
    if (product.isWishlisted) {
      removeFromWishlistHandler();
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
      utilToast("Items has been wishlisted!");
    }
  };

  const product = state.allProducts.find((product) => product.id === productId);

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
            {product?.isAddedToCart ? "GO TO CART" : "ADD TO CART"}
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={wishlistHandler}
          >
            {product?.isWishlisted ? "WISHLISTED" : "WISHLIST"}
          </button>
        </div>
      </div>

      <Toast show={showToast} message={toastMessage} />
    </div>
  );
};

export default ProductDetails;
