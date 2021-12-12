import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import AllProducts from "../components/AllProducts/AllProducts";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Profile from "../components/Profile/Profile";
import NotFound from "../components/NotFound/NotFound";

import useAxios from "../server/useAxios";

const Wishlist = lazy(() => import("../components/Wishlist/Wishlist"));
const Cart = lazy(() => import("../components/Cart/Cart"));
const ProductDetails = lazy(() =>
  import("../components/ProductDetails/ProductDetails")
);

const AppRouter = () => {
  const [isProductLoading, productLoadingError] = useAxios(
    "product",
    "allProducts"
  );
  const [isWishlistLoading, wishlistLoadingError] = useAxios("wishlist", null);
  const [isCartLoading, cartLoadingError] = useAxios("cart", null);

  return (
    <Suspense fallback={<p>Loading Route...</p>}>
      <Routes>
        <Route path="/" element={<AllProducts loading={isProductLoading} />} />
        <PrivateRoute
          path="/wishlist"
          element={<Wishlist loading={isWishlistLoading} />}
        />
        <PrivateRoute path="/cart" element={<Cart loading={isCartLoading} />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
