import "./CartPrice.css";

const CartPrice = ({ totalMRP, totalPrice }) => {
  return (
    <div className="cartPrice">
      <div>
        <b>Price Details</b>
      </div>
      <div style={{ margin: "2rem 0" }}>
        <div className="horizontal-section">
          <p>Total MRP </p> <p>Rs. {totalMRP}</p>
        </div>
        <div className="horizontal-section" style={{ marginTop: "0.75rem" }}>
          <p>Discount on MRP </p>
          <p className="color-gr">- Rs. {totalMRP - totalPrice}</p>
        </div>
        <div className="horizontal-section" style={{ marginTop: "0.75rem" }}>
          <p>Convenience Fee </p>
          <p>
            <s>
              <small>Rs. 99</small>
            </s>{" "}
            <span className="color-gr">FREE</span>
          </p>
        </div>
        <div className="horizontal-section totalAmount">
          <p>
            <b>Total Amount</b>
          </p>
          <p>
            <b>Rs. {totalPrice}</b>
          </p>
        </div>
      </div>
      <button className="btn btn-primary btn-width">PLACE ORDER</button>
    </div>
  );
};

export default CartPrice;
