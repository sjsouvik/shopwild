import { useState } from "react";
import { useData } from "../../context/data-context";

import Product from "../AllProducts/Product/Product";
import Toast from "../Toast/Toast";

const Wishlist = () => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const value = useData();

  return (
    <div>
      <h2>
        My Wishlist{" "}
        <span style={{ fontSize: "1rem", fontWeight: "200" }}>
          {value.state.wishlist.length} item(s)
        </span>
      </h2>

      <div className="card-row">
        {value.state.wishlist.map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            offeredPrice={item.offeredPrice}
            actualPrice={item.actualPrice}
            buttonText="MOVE TO CART"
            setToast={setToast}
            setToastMessage={setToastMessage}
          />
        ))}
      </div>

      <Toast show={toast} message={toastMessage} />
    </div>
  );
};

export default Wishlist;
