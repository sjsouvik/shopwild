import { useData } from "../../../context/data-context";

const CartProduct = (props) => {
  const { dispatch } = useData();

  const utilToast = (setToast, setToastMessage, message) => {
    setToast(true);
    setToastMessage(message);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  const clickHandler = (e) => {
    if (e.target.textContent === "MOVE TO WISHLIST") {
      dispatch({ type: "ADD_TO_WISHLIST", payload: props });
      utilToast(props.setToast, props.setToastMessage, "Moved to Wishlist!");
    }

    dispatch({ type: "REMOVE_FROM_CART", payload: props.id });

    if (e.target.textContent === "REMOVE") {
      utilToast(props.setToast, props.setToastMessage, "Removed from Cart!");
    }
  };

  return (
    <div className="card horizontal">
      <img src={props.image} alt="image" className="horizontal-card-image" />
      <div className="card-body">
        <div className="horizontal-section">
          <p className="product-title">{props.title}</p>
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
              onClick={() =>
                dispatch({ type: "INCREASE_QUANTITY", payload: props.id })
              }
            >
              <ion-icon name="add"></ion-icon>
            </button>
            {props.quantity}
            <button
              className="btn btn-outline-primary btn-dec"
              onClick={() => {
                if (props.quantity > 1) {
                  dispatch({ type: "DECREASE_QUANTITY", payload: props.id });
                }
              }}
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