export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_BRAND":
      return {
        ...state,
        brands: {
          ...state.brands,
          [action.payload]: !state.brands[action.payload],
        },
      };

    default:
      return state;
  }
};
