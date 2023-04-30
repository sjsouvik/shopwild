import { Product, Loader, Toast } from "../../components";
import SideBar from "./SideBar/SideBar";
import SideBarContent from "./SideBar/SideBarContent/SideBarContent";
import { useState } from "react";
import { useData, useFilter } from "../../context";
import useAxios from "../../server/useAxios";
import "./AllProducts.css";

import Empty from "../../assets/empty.svg";

const SideMenu = (props) => {
  return (
    <nav className="side-menu" data-testid="sideFilter">
      {props.children}
    </nav>
  );
};

const AllProducts = (props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const { state } = useData();
  const { state: filterState } = useFilter();

  const filterProducts = (products) => {
    const { sortBy, filterByBrands, filterByDiscounts } = filterState;

    let filteredProducts = products;

    /* 
    
    sort() method mutates the original array, so, if we want to avoid that, we can do any of the following approaches:
    
    1. use toSorted() method instead of sort() method which returns a new array with sorted items
    2. create a shallow copy [...items] before  applying sort on it 

    Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sort_returns_the_reference_to_the_same_array

    */

    if (sortBy) {
      if (sortBy === "SORT_HIGH_TO_LOW") {
        filteredProducts = filteredProducts.toSorted(
          (a, b) => b.offeredPrice - a.offeredPrice
        );
      } else if (sortBy === "SORT_LOW_TO_HIGH") {
        filteredProducts = [...filteredProducts].sort(
          (a, b) => a.offeredPrice - b.offeredPrice
        );
      }
    }

    if (filterByBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterByBrands.includes(product.brandName)
      );
    }

    if (filterByDiscounts.length > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discount >= filterByDiscounts[0]
      );
    }

    if (searchedText) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.brandName
            .toLowerCase()
            .includes(searchedText.toLowerCase()) ||
          product.description.toLowerCase().includes(searchedText.toLowerCase())
      );
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts(state.allProducts);

  // TODO: use `useEffect()` and fetch wishlist, cart details only if user has logged in
  // following calls are useful to fetch wishlist, cart details once user logs in or the page is refreshed, so that the count of products in wishlist, cart could be shown
  useAxios("wishlist", null);
  useAxios("cart", null);

  return (
    <div className="grid-row">
      <SideMenu>
        <SideBarContent />
      </SideMenu>
      <div className="products">
        <input
          type="search"
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
                <img src={Empty} alt="empty list" height="300" width="300" />
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
