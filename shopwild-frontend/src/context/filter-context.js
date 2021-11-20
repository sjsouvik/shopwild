import { createContext, useContext, useReducer } from "react";

import { filterReducer } from "../reducer/filter-reducer";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    sortBy: null,
    filterByBrands: [],
    filterByDiscounts: [],
  });
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

export default FilterProvider;
