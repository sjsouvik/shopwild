import { createContext, useContext, useReducer } from "react";

import { dataReducer } from "../reducer/data-reducer";

const DataContext = createContext();

const dataState = {
  allProducts: [],
  wishlist: [],
  cart: [],
  toastMessage: null,
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, dataState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);

export default DataProvider;
