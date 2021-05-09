import { useData } from "../../context/data-context";

import CartProduct from "./CartProduct/CartProduct";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";

import "./Cart.css";

const Cart = (props) => {
  const {
    state: { cart },
  } = useData();

  let totalPrice = cart.reduce(
    (sum, { product, quantity }) => sum + product.offeredPrice * quantity,
    0
  );

  return (
    <div>
      <h2>
        My Cart{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {cart.length} item(s)
        </span>
      </h2>
      {props.loading ? (
        <Loader />
      ) : (
        <div>
          {cart.length === 0 && <div>Cart is empty :(</div>}
          {cart.length > 0 && (
            <div className="cart-body">
              <div>
                <b>Total: Rs. {totalPrice}</b>
              </div>
              {cart.map(
                ({ product, quantity }) =>
                  quantity > 0 && (
                    <CartProduct
                      key={product.id}
                      {...product}
                      quantity={quantity}
                    />
                  )
              )}
            </div>
          )}
        </div>
      )}
      <Toast />
    </div>
  );
};

export default Cart;
