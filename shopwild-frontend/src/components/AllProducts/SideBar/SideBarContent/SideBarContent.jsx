import { useData } from "../../../../context/data-context";
import { useFilter } from "../../../../context/filter-context";

const SideBarContent = () => {
  const { state } = useData();
  const { state: filterState, dispatch } = useFilter();

  const sortHandler = (e) => {
    dispatch({ type: "SORT", payload: e.target.value });
  };

  const sortByName = (a, b) => {
    if (a > b) {
      return 1;
    }

    if (a < b) {
      return -1;
    }

    return 0;
  };

  const getAllBrands = (products) => {
    return products.reduce((brands, currentProduct) => {
      if (!brands.includes(currentProduct.brandName)) {
        return [...brands, currentProduct.brandName];
      }

      return brands;
    }, []);
  };

  return (
    <>
      <div className="filter">
        <p>FILTERS</p>
        <p
          className="clear-filter"
          onClick={() => dispatch({ type: "CLEAR_FILTER" })}
        >
          CLEAR ALL
        </p>
      </div>

      <div>
        <p>Sort By</p>
        <p>
          <label>
            <input
              type="radio"
              name="sort"
              // value="SORT_HIGH_TO_LOW"
              // checked={filterState.sortBy === "SORT_HIGH_TO_LOW"}
              // onChange={(e) => sortHandler(e)}
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
              // value="SORT_LOW_TO_HIGH"
              // checked={filterState.sortBy === "SORT_LOW_TO_HIGH"}
              // onChange={(e) => sortHandler(e)}
              onChange={() =>
                dispatch({ type: "SORT", payload: "SORT_LOW_TO_HIGH" })
              }
            />
            Price - Low to High
          </label>
        </p>
      </div>

      {/* <div>
        <p>Sort By</p>
        <p>
          <label>
            <input
              type="radio"
              name="sort"
              value="SORT_HIGH_TO_LOW"
              checked={filterState.sortBy === "SORT_HIGH_TO_LOW"}
              onChange={sortHandler}
            />
            Price - High to Low
          </label>
        </p>
        <p>
          <label>
            <input
              type="radio"
              name="sort"
              value="SORT_LOW_TO_HIGH"
              checked={filterState.sortBy === "SORT_LOW_TO_HIGH"}
              onChange={sortHandler}
            />
            Price - Low to High
          </label>
        </p>
      </div> */}

      <div>
        <p>BRAND</p>
        {getAllBrands(state.allProducts)
          .sort((a, b) => sortByName(a, b))
          .map((brand) => (
            <p key={brand}>
              <label>
                <input
                  type="checkbox"
                  checked={filterState.filterByBrands.includes(brand)}
                  onChange={() =>
                    dispatch({ type: "FILTER_BY_BRANDS", payload: brand })
                  }
                />
                {brand}
              </label>
            </p>
          ))}
      </div>

      <div>
        <p>DISCOUNT</p>
        {[10, 20, 30, 40, 50].map((discount) => (
          <p key={discount}>
            <label>
              <input
                type="checkbox"
                checked={filterState.filterByDiscounts.includes(discount)}
                onChange={() =>
                  dispatch({
                    type: "FILTER_BY_DISCOUNTS",
                    payload: discount,
                  })
                }
              />
              {discount}% or above
            </label>
          </p>
        ))}
      </div>
    </>
  );
};

export default SideBarContent;
