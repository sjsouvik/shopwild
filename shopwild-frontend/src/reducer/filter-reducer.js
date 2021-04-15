export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };

    case "FILTER_BY_BRANDS":
      return {
        ...state,
        filterByBrands: state.filterByBrands.includes(action.payload)
          ? state.filterByBrands.filter((brand) => brand !== action.payload)
          : [...state.filterByBrands, action.payload],
      };

    default:
      return state;
  }
};
