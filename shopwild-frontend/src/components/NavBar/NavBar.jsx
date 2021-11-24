import { Link, NavLink } from "react-router-dom";

import { useData } from "../../context/data-context";
import { useAuth } from "../../context/auth-context";

import "./NavBar.css";

const NavBar = () => {
  const {
    state: { wishlist, cart },
  } = useData();

  const { authToken, authUser } = useAuth();

  const wishlistLength = wishlist?.length;
  const cartLength = cart?.length;

  return (
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
          <NavLink
            to={authToken ? "/profile" : "/login"}
            activeStyle={{ fontWeight: "bold" }}
          >
            <ion-icon name="person"></ion-icon>
            <div className="nav-text">
              {authToken ? `Hi, ${authUser?.firstName}` : "Log In"}
            </div>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/wishlist" activeStyle={{ fontWeight: "bold" }}>
            <div style={{ position: "relative" }}>
              <ion-icon name="heart"></ion-icon>
              {authToken && wishlistLength > 0 && (
                <span className="badge rounded-pill bg-light bg-wishlist">
                  {wishlistLength}
                </span>
              )}
            </div>
            <div className="nav-text">Wishlist</div>
          </NavLink>{" "}
        </li>
        <li className="nav-item">
          <NavLink to="/cart" activeStyle={{ fontWeight: "bold" }}>
            <div style={{ position: "relative" }}>
              <ion-icon name="cart"></ion-icon>
              {authToken && cartLength > 0 && (
                <span class="badge rounded-pill bg-light bg-cart">
                  {cartLength}
                </span>
              )}
            </div>
            <div className="nav-text">Cart</div>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
