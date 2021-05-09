import { NavLink, Link, Routes, Route } from "react-router-dom";

import "./App.css";

import NavBar from "./components/NavBar/NavBar";
import AllProducts from "./components/AllProducts/AllProducts";
import WishList from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import NotFound from "./components/NotFound/NotFound";

import useAxios from "./server/useAxios";

const App = () => {
  const [isProductLoading, productLoadingError] = useAxios(
    "product",
    "allProducts"
  );
  const [isWishlistLoading, wishlistLoadingError] = useAxios("wishlist", null);
  const [isCartLoading, cartLoadingError] = useAxios("cart", null);

  return (
    <div className="App">
      <NavBar />

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
