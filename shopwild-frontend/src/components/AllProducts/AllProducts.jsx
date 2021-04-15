import { useState } from "react";
import { Link } from "react-router-dom";

import { useData } from "../../context/data-context";
import { useFilter } from "../../context/filter-context";

import Product from "./Product/Product";
import Toast from "../Toast/Toast";
import "./AllProducts.css";

const SideMenu = (props) => {
  const { state: filterState, dispatch } = useFilter();

  return (
    <div style={{ display: props.open ? "block" : "none" }}>
      <nav className="side-bar">
        <p>FILTERS</p>

        <div>
          <p>Sort By</p>
          <p>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "SORT_HIGH_TO_LOW" })
                }
              />
              Price - High to Low
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "SORT_LOW_TO_HIGH" })
                }
              />
              Price - Low to High
            </label>
          </p>
        </div>

        <div>
          <p>BRAND</p>

          <p>
            <label>
              <input
                type="checkbox"
                checked={filterState.filterByBrands.includes("Roadster")}
                onChange={() =>
                  dispatch({ type: "FILTER_BY_BRANDS", payload: "Roadster" })
                }
              />
              Roadster
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={filterState.filterByBrands.includes("Dennis Lingo")}
                onChange={() =>
                  dispatch({
                    type: "FILTER_BY_BRANDS",
                    payload: "Dennis Lingo",
                  })
                }
              />
              Dennis Lingo
            </label>
          </p>
        </div>

        <div>
          <p>PRICE</p>
          <p>
            <label>
              <input type="checkbox" />
              Rs. 500 to Rs. 1000
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              Rs. 1000 to Rs. 2000
            </label>
          </p>
        </div>

        <div>
          <p>COLOR</p>
          <p>
            <label>
              <input type="checkbox" />
              Blue
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              Red
            </label>
          </p>
        </div>
      </nav>
    </div>
  );
};

const AllProducts = (props) => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [searchedText, setSearchedText] = useState("");

  const { state } = useData();
  const { state: filterState, dispatch } = useFilter();

  const filterProducts = (products) => {
    const sortBy = filterState.sortBy;

    let sortedProducts = products;

    if (sortBy && sortBy === "SORT_HIGH_TO_LOW") {
      sortedProducts = products.sort((a, b) => b.offeredPrice - a.offeredPrice);
    } else if (sortBy && sortBy === "SORT_LOW_TO_HIGH") {
      sortedProducts = products.sort((a, b) => a.offeredPrice - b.offeredPrice);
    }

    let filteredProducts = sortedProducts;

    if (filterState.filterByBrands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filterState.filterByBrands.includes(product.brandName)
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.brandName.toLowerCase().includes(searchedText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchedText.toLowerCase())
    );

    return filteredProducts;
  };

  const filteredProducts = filterProducts(state.allProducts);

  return (
    <div className="grid-row">
      <nav className="side-menu">
        <p>FILTERS</p>

        <div>
          <p>Sort By</p>
          <p>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "SORT_HIGH_TO_LOW" })
                }
              />
              Price - High to Low
            </label>
          </p>
          <p>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({ type: "SORT", payload: "SORT_LOW_TO_HIGH" })
                }
              />
              Price - Low to High
            </label>
          </p>
        </div>

        <div>
          <p>BRAND</p>

          <p>
            <label>
              <input
                type="checkbox"
                checked={filterState.filterByBrands.includes("Roadster")}
                onChange={() =>
                  dispatch({ type: "FILTER_BY_BRANDS", payload: "Roadster" })
                }
              />
              Roadster
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={filterState.filterByBrands.includes("Dennis Lingo")}
                onChange={() =>
                  dispatch({
                    type: "FILTER_BY_BRANDS",
                    payload: "Dennis Lingo",
                  })
                }
              />
              Dennis Lingo
            </label>
          </p>
        </div>

        <div>
          <p>PRICE</p>
          <p>
            <label>
              <input type="checkbox" />
              Rs. 500 to Rs. 1000
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              Rs. 1000 to Rs. 2000
            </label>
          </p>
        </div>

        <div>
          <p>COLOR</p>
          <p>
            <label>
              <input type="checkbox" />
              Blue
            </label>
          </p>
          <p>
            <label>
              <input type="checkbox" />
              Red
            </label>
          </p>
        </div>
      </nav>

      <div className="products">
        <input
          type="text"
          value={searchedText}
          className="form-control"
          placeholder="Search for products, brands and more"
          onChange={(e) => setSearchedText(e.target.value)}
        />
        {filteredProducts.length === 0 && (
          <h3>
            No Products found{" "}
            <em>
              <q>{searchedText}</q>
            </em>
          </h3>
        )}
        <div className="card-row">
          {filteredProducts.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              title={product.brandName}
              description={product.description}
              details={product.details}
              image={product.image}
              offeredPrice={product.offeredPrice}
              actualPrice={product.actualPrice}
              buttonText="ADD TO CART"
              wishlist={product.isWishlisted}
              cart={product.isAddedToCart}
              setToast={setToast}
              setToastMessage={setToastMessage}
            />
          ))}
        </div>

        <SideMenu open={openFilter} />
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
        <Toast show={toast} message={toastMessage} />
      </div>
    </div>
  );
};

export default AllProducts;
