import { useData } from "../../context";

import CartProduct from "./CartProduct/CartProduct";
import CartPrice from "./CartPrice/CartPrice";
import { Loader, Toast } from "../../components";
import EmptyCart from "../../assets/empty_cart.svg";
import "./Cart.css";
import { priceOfCart, pluralize } from "../../helper";

const Cart = (props) => {
  const {
    state: { cart },
  } = useData();

  let [totalMRP, totalPrice] = priceOfCart(cart);

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
          {` (${pluralize(cart.length, "item")})`}
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
