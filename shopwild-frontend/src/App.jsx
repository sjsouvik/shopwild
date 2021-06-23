import { Routes, Route } from "react-router-dom";

import "./App.css";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
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
          <PrivateRoute
            path="/wishlist"
            element={<WishList loading={isWishlistLoading} />}
          />
          <PrivateRoute
            path="/cart"
            element={<Cart loading={isCartLoading} />}
          />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
