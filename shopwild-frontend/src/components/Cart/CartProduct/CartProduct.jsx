import { useData } from "../../../context/data-context";

import serverRequests from "../../../server/serverRequests";

const CartProduct = (props) => {
  const { dispatch } = useData();

  const utilToast = (setToast, setToastMessage, message) => {
    setToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const clickHandler = async (e) => {
    if (e.target.textContent === "MOVE TO WISHLIST") {
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
        utilToast(props.setToast, props.setToastMessage, "Moved to Wishlist!");
      }
    }

    const { error } = await serverRequests({
      requestType: "delete",
      url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
      data: { product: props.id },
    });

    if (!error) {
      dispatch({ type: "REMOVE_FROM_CART", payload: props.id });
    }

    if (e.target.textContent === "REMOVE") {
      utilToast(props.setToast, props.setToastMessage, "Removed from Cart!");
    }
  };

  const increaseQuantityHandler = async () => {
    const { error } = await serverRequests({
      requestType: "post",
      url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
      data: {
        products: [{ product: props.id, quantity: props.quantity + 1 }],
      },
    });
    if (!error) {
      dispatch({ type: "INCREASE_QUANTITY", payload: props.id });
    }
  };

  const decreaseQuantityHandler = async () => {
    if (props.quantity > 1) {
      const { error } = await serverRequests({
        requestType: "post",
        url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
        data: {
          products: [{ product: props.id, quantity: props.quantity - 1 }],
        },
      });
      if (!error) {
        dispatch({ type: "DECREASE_QUANTITY", payload: props.id });
      }
    }
  };

  return (
    <div className="card horizontal">
      <img src={props.image} alt="image" className="horizontal-card-image" />
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
            onClick={(e) => clickHandler(e)}
          >
            REMOVE
          </button>
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => clickHandler(e)}
          >
            MOVE TO WISHLIST
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
