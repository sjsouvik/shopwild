import { useData } from "../../context/data-context";
import { useState } from "react";

import CartProduct from "./CartProduct/CartProduct";
import Toast from "../Toast/Toast";

const Cart = () => {
  const value = useData();

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // to get the total price of the items in cart
  let totalPrice = value.state.cart.reduce(
    (sum, item) => sum + item.offeredPrice * item.qty,
    0
  );

  return (
    <div>
      <h2>
        My Cart{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {value.state.cart.length} item(s)
        </span>
      </h2>
      {value.state.cart.length === 0 && <div>Cart is empty :(</div>}
      {value.state.cart.length > 0 && (
        <div
          style={{
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <b>Total: Rs. {totalPrice}</b>
          </div>
          {value.state.cart.map((cartItem) => (
            <CartProduct
              key={cartItem.id}
              id={cartItem.id}
              title={cartItem.title}
              description={cartItem.description}
              image={cartItem.image}
              offeredPrice={cartItem.offeredPrice}
              actualPrice={cartItem.actualPrice}
              quantity={cartItem.qty}
              setToast={setToast}
              setToastMessage={setToastMessage}
            />
          ))}
        </div>
      )}
      <Toast show={toast} message={toastMessage} />
    </div>
  );
};

export default Cart;
