import { NavLink, Link, Routes, Route } from "react-router-dom";

import "./App.css";

import AllProducts from "./components/AllProducts/AllProducts";
import WishList from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";

import useAxios from "./server/useAxios";

import { useData } from "./context/data-context";

const App = () => {
  const { state, dispatch } = useData();

  const [isProductLoading, productLoadingError] = useAxios(
    "product",
    "allProducts"
  );
  const [isWishlistLoading, wishlistLoadingError] = useAxios("wishlist", null);
  const [isCartLoading, cartLoadingError] = useAxios("cart", null);

  const wishlistLength = state.wishlist.filter((item) => item.isWishlisted)
    .length;
  const cartLength = state.cart.filter((item) => item.quantity > 0).length;

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
              <ion-icon name="person"></ion-icon>
              <div style={{ fontSize: "0.85rem" }}>Log In</div>
            </li>
            <li className="nav-item">
              <NavLink to="wishlist" activeStyle={{ fontWeight: "bold" }}>
                <div style={{ position: "relative" }}>
                  <ion-icon name="heart"></ion-icon>
                  {wishlistLength > 0 && (
                    <span className="badge rounded-pill bg-light bg-wishlist">
                      {wishlistLength}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.85rem" }}>Wishlist</div>
              </NavLink>{" "}
            </li>
            <li className="nav-item">
              <NavLink to="cart" activeStyle={{ fontWeight: "bold" }}>
                <div style={{ position: "relative" }}>
                  <ion-icon name="cart"></ion-icon>
                  {cartLength > 0 && (
                    <span class="badge rounded-pill bg-light bg-cart">
                      {cartLength}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.85rem" }}>Cart</div>
              </NavLink>
            </li>
            {/* 
            <li className="nav-item">
              <button className="btn btn-secondary">SIGN UP</button>
            </li> */}
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={<AllProducts loading={isProductLoading} />}
          />
          <Route
            path="wishlist"
            element={<WishList loading={isWishlistLoading} />}
          />
          <Route path="cart" element={<Cart loading={isCartLoading} />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
