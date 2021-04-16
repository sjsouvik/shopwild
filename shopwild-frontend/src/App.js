import { NavLink, Link, Routes, Route } from "react-router-dom";

import "./App.css";

import AllProducts from "./components/AllProducts/AllProducts";
import WishList from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";

import { useData } from "./context/data-context";

const App = () => {
  const { state } = useData();

  return (
    <div className="App">
      <header>
        <nav className="page-navigation">
          <div className="brand">
            <h3 className="nav-brand">
              <Link to="/">SHOPWILD</Link>
            </h3>
          </div>
          <ul className="nav-menu">
            {/* <li className="nav-item">
              <NavLink to="/" activeStyle={{ fontWeight: "bold" }} end>
                HOME
              </NavLink>{" "}
            </li> */}
            <li className="nav-item">
              <NavLink to="wishlist" activeStyle={{ fontWeight: "bold" }}>
                <ion-icon name="heart"></ion-icon>
                {state.wishlist.length > 0 && (
                  <span class="badge rounded-pill bg-light bg-icon">
                    {state.wishlist.length}
                  </span>
                )}
              </NavLink>{" "}
            </li>
            <li className="nav-item">
              <NavLink to="cart" activeStyle={{ fontWeight: "bold" }}>
                <ion-icon name="cart"></ion-icon>
                {state.cart.length > 0 && (
                  <span class="badge rounded-pill bg-light bg-icon">
                    {state.cart.length}
                  </span>
                )}
              </NavLink>{" "}
            </li>
            {/* <li className="nav-item">
              <button className="btn btn-secondary">LOG IN</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-secondary">SIGN UP</button>
            </li> */}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<AllProducts />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
