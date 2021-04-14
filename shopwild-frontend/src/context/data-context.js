import { createContext, useContext, useReducer } from "react";
// import uuid from "react-uuid";

import { dataReducer } from "../reducer/data-reducer";

const DataContext = createContext();

const allProducts = [
  {
    id: 1,
    brandName: "Roadster",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
    offeredPrice: 1689,
    actualPrice: 2599,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 2,
    brandName: "Dennis Lingo",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg",
    offeredPrice: 1628,
    actualPrice: 2249,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 3,
    brandName: "Roadster",
    description: "Regular Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/2230204/2021/3/16/b93f84ed-41cd-4f2b-bb52-f2b67f8c6c2d1615874312574-Roadster-Men-Blue--Black-Regular-Fit-Checked-Casual-Shirt-74-1.jpg",
    offeredPrice: 1584,
    actualPrice: 2299,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 4,
    brandName: "Roadster",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
    offeredPrice: 1689,
    actualPrice: 2599,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 5,
    brandName: "Roadster",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
    offeredPrice: 1689,
    actualPrice: 2599,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 6,
    brandName: "Roadster",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
    offeredPrice: 1689,
    actualPrice: 2599,
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 7,
    brandName: "Roadster",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
    offeredPrice: 1689,
    actualPrice: 2599,
    isWishlisted: false,
    isAddedToCart: false,
  },
];

const dataState = {
  allProducts,
  wishlist: [],
  cart: [],
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
