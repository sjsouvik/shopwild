import { useData } from "../../../context/data-context";
import { useAuth } from "../../../context/auth-context";

import serverRequests from "../../../server/serverRequests";

import { toastHandler, useDisableToast } from "../../Toast/Toast";

import { addToWishlist, removeFromCart } from "../../../server/serverUpdate";

const CartProduct = (props) => {
  const { dispatch } = useData();
  const {
    authUser: { _id },
    authToken,
  } = useAuth();

  const removeFromCartHandler = () => {
    const isItemRemoved = removeFromCart(
      dispatch,
      { ...props },
      _id,
      authToken
    );
    if (isItemRemoved) {
      toastHandler(dispatch, "Removed from Cart!");
    }
  };

  const moveToWishlistHandler = () => {
    const isItemAdded = addToWishlist(dispatch, { ...props }, _id, authToken);
    if (isItemAdded) {
      const isItemRemoved = removeFromCart(
        dispatch,
        { ...props },
        _id,
        authToken
      );

      if (isItemRemoved) {
        toastHandler(dispatch, "Moved to Wishlist!");
      }
    }
  };

  const increaseQuantityHandler = async () => {
    const { statusCode } = await serverRequests({
      requestType: "post",
      url: `${process.env.REACT_APP_BACKEND}/cart/update/${_id}`,
      data: {
        product: props.id,
        quantity: props.quantity + 1,
      },
      token: { headers: { authorization: `Bearer ${authToken}` } },
    });
    if (statusCode === 200) {
      dispatch({ type: "INCREASE_QUANTITY", payload: props.id });
    }
  };

  const decreaseQuantityHandler = async () => {
    if (props.quantity > 1) {
      const { statusCode } = await serverRequests({
        requestType: "post",
        url: `${process.env.REACT_APP_BACKEND}/cart/update/${_id}`,
        data: {
          product: props.id,
          quantity: props.quantity - 1,
        },
        token: { headers: { authorization: `Bearer ${authToken}` } },
      });
      if (statusCode === 200) {
        dispatch({ type: "DECREASE_QUANTITY", payload: props.id });
      }
    }
  };

  useDisableToast();

  return (
    <div className="card horizontal">
      <img
        src={props.image}
        alt="products in cart"
        width="144"
        height="192"
        className="horizontal-card-image"
      />
      <div className="card-body">
        <div className="horizontal-section">
          <p className="product-title">{props.brandName}</p>
          <p className="offered-price">Rs. {props.offeredPrice}</p>
        </div>

        <div className="horizontal-section">
          <p>{props.description}</p>
          <p>
            <s>
              <small>Rs. {props.actualPrice}</small>
            </s>
          </p>
        </div>

        <div className="horizontal-section">
          <p>
            Qty:
            <button
              className="btn btn-outline-primary btn-inc"
              onClick={increaseQuantityHandler}
            >
              <ion-icon name="add"></ion-icon>
            </button>
            {props.quantity}
            <button
              className="btn btn-outline-primary btn-dec"
              onClick={decreaseQuantityHandler}
            >
              <ion-icon name="remove"></ion-icon>
            </button>
          </p>
          <p>Size: 40</p>
        </div>

        <div className="horizontal-section">
          <button
            className="btn btn-sm btn-danger"
            onClick={removeFromCartHandler}
          >
            REMOVE
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={moveToWishlistHandler}
          >
            MOVE TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
