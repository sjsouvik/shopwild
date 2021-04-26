import { useData } from "../../context/data-context";
import { useState } from "react";

import CartProduct from "./CartProduct/CartProduct";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";

const Cart = (props) => {
  const value = useData();

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  let totalPrice = value.state.cart.reduce(
    (sum, { product, quantity }) => sum + product.offeredPrice * quantity,
    0
  );

  return (
    <div>
      <h2>
        My Cart{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {value.state.cart.filter((item) => item.quantity > 0).length} item(s)
        </span>
      </h2>
      {props.loading ? (
        <Loader />
      ) : (
        <div>
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
              {value.state.cart.map(
                ({ product, quantity }) =>
                  quantity > 0 && (
                    <CartProduct
                      key={product.id}
                      id={product.id}
                      title={product.brandName}
                      description={product.description}
                      image={product.image}
                      offeredPrice={product.offeredPrice}
                      actualPrice={product.actualPrice}
                      quantity={quantity}
                      setToast={setToast}
                      setToastMessage={setToastMessage}
                    />
                  )
              )}
            </div>
          )}
        </div>
      )}
      <Toast show={toast} message={toastMessage} />
    </div>
  );
};

export default Cart;
