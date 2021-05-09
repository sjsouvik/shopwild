import { Link, NavLink } from "react-router-dom";

import { useData } from "../../context/data-context";

const NavBar = () => {
  const {
    state: { wishlist, cart },
  } = useData();

  const wishlistLength = wishlist.length;
  const cartLength = cart.length;

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
  );
};

export default NavBar;
