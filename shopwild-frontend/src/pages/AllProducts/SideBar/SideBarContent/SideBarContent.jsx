import { useData, useFilter } from "../../../../providers";
import {
  discountsInPerCentage,
  getAllBrandsFromProducts,
  sortByName,
} from "../../../../helper";

const SideBarContent = () => {
  const { state } = useData();
  const { filterState, filterDispatch } = useFilter();

  return (
    <>
      <div className="filter">
        <p>FILTERS</p>
        <p
          className="clear-filter"
          onClick={() => filterDispatch({ type: "CLEAR_FILTER" })}
        >
          CLEAR ALL
        </p>
      </div>

      <div>
        <p>Sort By</p>
        <p>
          <label className="cursor-ptr">
            <input
              type="radio"
              checked={filterState.sortBy === "SORT_HIGH_TO_LOW"}
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "SORT_HIGH_TO_LOW",
                })
              }
            />
            Price - High to Low
          </label>
        </p>
        <p>
          <label className="cursor-ptr">
            <input
              type="radio"
              checked={filterState.sortBy === "SORT_LOW_TO_HIGH"}
              onChange={() =>
                filterDispatch({
                  type: "SORT_BY_PRICE",
                  payload: "SORT_LOW_TO_HIGH",
                })
              }
            />
            Price - Low to High
          </label>
        </p>
      </div>

      <div>
        <p>BRAND</p>
        {getAllBrandsFromProducts(state.allProducts)
          .sort((a, b) => sortByName(a, b))
          .map((brand) => (
            <p key={brand}>
              <label className="cursor-ptr">
                <input
                  type="checkbox"
                  checked={filterState.filterByBrands.includes(brand)}
                  onChange={() =>
                    filterDispatch({ type: "FILTER_BY_BRANDS", payload: brand })
                  }
                />
                {brand}
              </label>
            </p>
          ))}
      </div>

      <div>
        <p>DISCOUNT</p>
        {discountsInPerCentage.map((discount) => (
          <p key={discount}>
            <label className="cursor-ptr">
              <input
                type="checkbox"
                checked={filterState.filterByDiscounts.includes(discount)}
                onChange={() =>
                  filterDispatch({
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
