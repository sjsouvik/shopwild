import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute, Loader } from "../components";
import AllProducts from "../pages/AllProducts/AllProducts";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NotFound from "../pages/NotFound/NotFound";
import useAxios from "../server/useAxios";

const Wishlist = lazy(() => import("../pages/Wishlist/Wishlist"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ProductDetails = lazy(() =>
  import("../pages/ProductDetails/ProductDetails")
);

const AppRouter = () => {
  const [isProductLoading, productLoadingError] = useAxios(
    "product",
    "allProducts"
  );
  const [isWishlistLoading, wishlistLoadingError] = useAxios("wishlist", null);
  const [isCartLoading, cartLoadingError] = useAxios("cart", null);

  const routes = [
    { path: "/", element: <AllProducts loading={isProductLoading} /> },
    { path: "/products/:id", element: <ProductDetails /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <PrivateRoute
          path="/wishlist"
          element={<Wishlist loading={isWishlistLoading} />}
        />
        <PrivateRoute path="/cart" element={<Cart loading={isCartLoading} />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
