import { useState } from "react";

import { useData } from "../../context/data-context";
import { useFilter } from "../../context/filter-context";

import useAxios from "../../server/useAxios";

import Product from "./Product/Product";
import SideBar from "./SideBar/SideBar";
import SideBarContent from "./SideBar/SideBarContent/SideBarContent";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import "./AllProducts.css";

import Empty from "../../assets/empty.svg";

const SideMenu = (props) => {
  return <nav className="side-menu">{props.children}</nav>;
};

const AllProducts = (props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const { state } = useData();
  const { state: filterState, dispatch } = useFilter();

  const filterProducts = (products) => {
    const sortBy = filterState.sortBy;

    let sortedProducts;

    if (sortBy && sortBy === "SORT_HIGH_TO_LOW") {
      sortedProducts = products.sort((a, b) => b.offeredPrice - a.offeredPrice);
    } else if (sortBy && sortBy === "SORT_LOW_TO_HIGH") {
      sortedProducts = products.sort((a, b) => a.offeredPrice - b.offeredPrice);
    } else {
      sortedProducts = products;
    }

    let filteredProducts = sortedProducts;

    if (filterState.filterByBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterState.filterByBrands.includes(product.brandName)
      );
    }

    if (filterState.filterByDiscounts.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discount >= filterState.filterByDiscounts[0]
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.brandName.toLowerCase().includes(searchedText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchedText.toLowerCase())
    );

    return filteredProducts;
  };

  const sortHandler = (e) => {
    dispatch({ type: "SORT", payload: e.target.value });
  };

  const filteredProducts = filterProducts(state.allProducts);

  const [isWishlistLoading, wishlistLoadingError] = useAxios("wishlist", null);
  const [isCartLoading, cartLoadingError] = useAxios("cart", null);

  return (
    <div className="grid-row">
      <SideMenu>
        <SideBarContent />
      </SideMenu>
      <div className="products">
        <input
          type="text"
          value={searchedText}
          className="form-control"
          placeholder="Search for products, brands and more"
          onChange={(e) => setSearchedText(e.target.value)}
        />

        {props.loading ? (
          <Loader />
        ) : (
          <div>
            {filteredProducts.length === 0 && (
              <div>
                <h3>
                  No Products found{" "}
                  <em>
                    <q>{searchedText}</q>
                  </em>
                </h3>
                <img src={Empty} alt="empty list" className="empty-wishlist" />
              </div>
            )}
            <div className="card-row">
              {filteredProducts.map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  buttonText="ADD TO CART"
                />
              ))}
            </div>
          </div>
        )}

        <SideBar open={openFilter}>
          <SideBarContent />
        </SideBar>
        <div
          className="arrow-top filter-button"
          onClick={() => setOpenFilter((filter) => !filter)}
        >
          {openFilter ? (
            <ion-icon
              name="close"
              // className="icon-close"
              style={{ position: "relative", top: "0.5rem", fontSize: "200%" }}
            ></ion-icon>
          ) : (
            <ion-icon
              name="funnel"
              // className="icon-filter"
              style={{ position: "relative", top: "0.9rem", fontSize: "150%" }}
            ></ion-icon>
          )}
        </div>
        <Toast />
      </div>
    </div>
  );
};

export default AllProducts;
