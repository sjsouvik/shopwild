import "./Product.css";

import { useNavigate, Link } from "react-router-dom";

import { useData } from "../../../context/data-context";
import { useAuth } from "../../../context/auth-context";

import { toastHandler, useDisableToast } from "../../Toast/Toast";

import {
  addToWishlist,
  removeFromWishlist,
  addToCart,
} from "../../../server/serverUpdate";

const Product = (props) => {
  const { state, dispatch } = useData();
  const navigate = useNavigate();

  const { authToken, authUser } = useAuth();

  const isAddedToList = (list = []) => {
    return list.some(({ product }) => product.id === props.id);
  };

  const clickHandler = (e) => {
    switch (e.target.textContent) {
      case "ADD TO CART":
        if (!authToken) {
          return toastHandler(dispatch, "Login to add to Cart!");
        }
        const isItemAdded = addToCart(
          dispatch,
          { ...props },
          authUser._id,
          authToken
        );
        if (isItemAdded) {
          toastHandler(dispatch, "Added to Cart!");
        }
        break;

      case "MOVE TO CART":
        const isItemAddedToCart = addToCart(
          dispatch,
          { ...props },
          authUser._id,
          authToken
        );

        if (isItemAddedToCart) {
          const isItemRemoved = removeFromWishlist(
            dispatch,
            { ...props },
            authUser._id,
            authToken
          );
          if (isItemRemoved) {
            toastHandler(dispatch, "Moved to Cart!");
          }
        }
        break;

      case "GO TO CART":
        navigate("/cart");
        break;

      default:
        return;
    }
  };

  const removeFromWishlistHandler = () => {
    const isItemRemoved = removeFromWishlist(
      dispatch,
      { ...props },
      authUser._id,
      authToken
    );

    if (isItemRemoved) {
      toastHandler(dispatch, "Removed from wishlist!");
    }
  };

  const wishlistHandler = () => {
    if (isAddedToList(state.wishlist)) {
      return removeFromWishlistHandler();
    } else {
      if (!authToken) {
        return toastHandler(dispatch, "Login to add to Wishlist!");
      }

      const isItemWishlisted = addToWishlist(
        dispatch,
        { ...props },
        authUser._id,
        authToken
      );
      if (isItemWishlisted) {
        toastHandler(dispatch, "Items has been wishlisted!");
      }
    }
  };

  useDisableToast();

  return (
    <div className="card vertical" data-testid="productCard">
      <span
        className="btn-image"
        style={{
          display: props.buttonText === "ADD TO CART" ? "block" : "none",
        }}
        onClick={wishlistHandler}
      >
        <ion-icon
          name="heart"
          style={
            authToken && isAddedToList(state.wishlist) ? { color: "red" } : null
          }
        ></ion-icon>
      </span>
      <span
        className="btn-image"
        style={{
          display: props.buttonText === "MOVE TO CART" ? "block" : "none",
        }}
        onClick={removeFromWishlistHandler}
      >
        <ion-icon name="close-circle"></ion-icon>
      </span>

      <Link
        to={{ pathname: `/products/${props.id}` }}
        state={props.id}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="card-image">
          <img src={props.image} alt="pic of product" />
        </div>

        <div
          className="card-body"
          style={{ textAlign: "left", padding: "0.5rem" }}
        >
          <h3 className="card-title">{props.brandName}</h3>
          <p className="card-description">{props.description}</p>
          <p className="card-price">
            <b>Rs. {props.offeredPrice}</b>{" "}
            <span>
              <small>
                <s>Rs. {props.actualPrice}</s>
              </small>
            </span>{" "}
            <span className="card-off">({props.discount}% off)</span>
          </p>
        </div>
      </Link>
      <div style={{ padding: "0 0.5rem 0.5rem 0.5rem" }}>
        <button
          className="btn btn-primary"
          style={{ width: "100%", margin: "0" }}
          onClick={(e) => clickHandler(e)}
        >
          {authToken && isAddedToList(state.cart)
            ? "GO TO CART"
            : props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Product;
