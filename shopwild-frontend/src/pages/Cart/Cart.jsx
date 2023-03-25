import { useData } from "../../context";

import CartProduct from "./CartProduct/CartProduct";
import CartPrice from "./CartPrice/CartPrice";
import { Loader, Toast } from "../../components";
import EmptyCart from "../../assets/empty_cart.svg";
import "./Cart.css";

const Cart = (props) => {
  const {
    state: { cart },
  } = useData();

  let [totalMRP, totalPrice] = cart.reduce(
    (sum, { product, quantity }) => {
      sum[0] += product.actualPrice * quantity;
      sum[1] += product.offeredPrice * quantity;
      return sum;
    },
    [0, 0]
  );

  if (props.loading) {
    return <Loader />;
  }

  if (cart.length === 0) {
    return (
      <div>
        <h3>Your cart is empty :(</h3>
        <img src={EmptyCart} alt="empty cart" height="300" width="300" />
      </div>
    );
  }

  return (
    <div>
      <h2>
        My Cart
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {` ${cart.length} item(s)`}
        </span>
      </h2>

      <section className="cart">
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

        <CartPrice totalMRP={totalMRP} totalPrice={totalPrice} />
      </section>

      <Toast />
    </div>
  );
};

export default Cart;
