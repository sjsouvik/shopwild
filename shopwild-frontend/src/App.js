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

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setLoading(true);
  //       const response = await serverRequests({
  //         requestType: "get",
  //         url: `${process.env.REACT_APP_BACKEND}/product`,
  //       });
  //       // const response = await axios.get(
  //       //   `${process.env.REACT_APP_BACKEND}/product`
  //       // );

  //       console.log(response);
  //     } catch (error) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   })();
  // }, []);

  const [isProductLoading, productLoadingError] = useAxios(
    "product",
    "get",
    null,
    "allProducts"
  );
  const [isWishlistLoading, wishlistLoadingError] = useAxios(
    "wishlist",
    "get",
    null,
    null
  );
  const [isCartLoading, cartLoadingError] = useAxios("cart", "get", null, null);

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
              <NavLink to="wishlist" activeStyle={{ fontWeight: "bold" }}>
                <ion-icon name="heart"></ion-icon>
                {wishlistLength > 0 && (
                  <span class="badge rounded-pill bg-light bg-icon">
                    {wishlistLength}
                  </span>
                )}
              </NavLink>{" "}
            </li>
            <li className="nav-item">
              <NavLink to="cart" activeStyle={{ fontWeight: "bold" }}>
                <ion-icon name="cart"></ion-icon>
                {cartLength > 0 && (
                  <span class="badge rounded-pill bg-light bg-icon">
                    {cartLength}
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
