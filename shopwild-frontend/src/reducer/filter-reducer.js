export const initialFilterState = {
  sortBy: null,
  filterByBrands: [],
  filterByDiscounts: [],
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sortBy: action.payload };

    case "FILTER_BY_BRANDS":
      return {
        ...state,
        filterByBrands: state.filterByBrands.includes(action.payload)
          ? state.filterByBrands.filter((brand) => brand !== action.payload)
          : [...state.filterByBrands, action.payload],
      };

    case "FILTER_BY_DISCOUNTS":
      return {
        ...state,
        filterByDiscounts: state.filterByDiscounts.includes(action.payload)
          ? state.filterByDiscounts.filter(
              (discount) => discount !== action.payload
            )
          : [...state.filterByDiscounts, action.payload].sort((a, b) => a - b),
      };

    case "CLEAR_FILTER":
      return initialFilterState;

    default:
      return state;
  }
};
