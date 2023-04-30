import { createContext, useContext, useReducer } from "react";

import { initialFilterState, filterReducer } from "../reducers/filterReducer";

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );
  return (
    <FilterContext.Provider value={{ filterState, filterDispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);

export default FilterProvider;
