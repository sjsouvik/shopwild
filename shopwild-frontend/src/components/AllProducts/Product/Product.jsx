import "./Product.css";

import { useNavigate, Link } from "react-router-dom";
import { useData } from "../../../context/data-context";

import serverRequests from "../../../server/serverRequests";
import useAxios from "../../../server/useAxios";
import { useState } from "react";

const Product = (props) => {
  const { dispatch } = useData();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const utilToast = (setToast, setToastMessage, message) => {
    setToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const clickHandler = async (e) => {
    if (e.target.textContent === "ADD TO CART") {
      try {
        setLoading(true);
        const { error } = await serverRequests({
          requestType: "post",
          url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
          data: { products: [{ product: props.id, quantity: 1 }] },
        });

        // dispatch({ type: "ADD_TO_CART", payload: { ...props, qty: 1 } });
        if (!error) {
          dispatch({
            type: "ADD_TO_CART",
            payload: { product: { ...props }, quantity: 1 },
          });
          utilToast(props.setToast, props.setToastMessage, "Added to Cart!");
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    } else if (e.target.textContent === "MOVE TO CART") {
      const { error } = await serverRequests({
        requestType: "post",
        url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
        data: { products: [{ product: props.id, quantity: 1 }] },
      });

      if (!error) {
        dispatch({
          type: "ADD_TO_CART",
          payload: { product: { ...props }, quantity: 1 },
        });

        const { error } = await serverRequests({
          requestType: "post",
          url: `${process.env.REACT_APP_BACKEND}/wishlist/607d92eee69f8b99745ef728`,
          data: { products: [{ product: props.id, isWishlisted: false }] },
        });

        if (!error) {
          dispatch({ type: "REMOVE_FROM_WISHLIST", payload: props.id });
          utilToast(props.setToast, props.setToastMessage, "Moved to Cart!");
        }
      }
    } else if (e.target.textContent === "GO TO CART") {
      navigate("/cart");
    }
  };

  const removeFromWishlistHandler = async () => {
    const { error } = await serverRequests({
      requestType: "post",
      url: `${process.env.REACT_APP_BACKEND}/wishlist/607d92eee69f8b99745ef728`,
      data: { products: [{ product: props.id, isWishlisted: false }] },
    });

    if (!error) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: props.id });
      utilToast(
        props.setToast,
        props.setToastMessage,
        "Removed from wishlist!"
      );
    }
  };

  const wishlistHandler = async () => {
    if (props.wishlist) {
      removeFromWishlistHandler();
    } else {
      const { error } = await serverRequests({
        requestType: "post",
        url: `${process.env.REACT_APP_BACKEND}/wishlist/607d92eee69f8b99745ef728`,
        data: { products: [{ product: props.id, isWishlisted: true }] },
      });

      if (!error) {
        dispatch({
          type: "ADD_TO_WISHLIST",
          payload: { product: { ...props }, isWishlisted: true },
        });
        utilToast(
          props.setToast,
          props.setToastMessage,
          "Items has been wishlisted!"
        );
      }
    }
  };

  return (
    <div className="card vertical">
      <span
        className="btn-image"
        style={{
          display: props.buttonText === "ADD TO CART" ? "block" : "none",
        }}
        onClick={wishlistHandler}
      >
        <ion-icon
          name="heart"
          style={props.wishlist ? { color: "red" } : null}
        ></ion-icon>
      </span>
      <span
        class="btn-image"
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
        <div class="card-image">
          <img src={props.image} alt="pic of product" />
        </div>

        <div
          className="card-body"
          style={{ textAlign: "left", padding: "0.5rem" }}
        >
          <h3 className="card-title">{props.title}</h3>
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
          {props.cart ? "GO TO CART" : props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Product;
