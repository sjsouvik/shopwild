const calculateDiscount = (actualPrice, offeredPrice) => {
  return Math.round(((actualPrice - offeredPrice) / actualPrice) * 100);
};

export const allProductsFromDB = [
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
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
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
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
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
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 4,
    brandName: "GANT",
    description: "Regular Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/9/24/f7f19809-8be3-4261-91ec-faca9c263beb1600905518300-1.jpg",
    offeredPrice: 6649,
    actualPrice: 9499,
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
    ishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 5,
    brandName: "GANT",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/7645753/2019/2/9/8eff5dda-9bfd-4a15-8019-015db8088a5d1549694950699-GANT-Men-Blue-Button-Down-Collar-Long-Sleeves-Shirt-22015496-1.jpg",
    offeredPrice: 5999,
    actualPrice: 11999,
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 6,
    brandName: "WROGN",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/13673082/2021/4/6/55dd98b2-18ef-4efb-8c12-a309e2ae7da31617712425040-WROGN-Men-Shirts-971617712424347-1.jpg",
    offeredPrice: 1379,
    actualPrice: 2299,
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
    isWishlisted: false,
    isAddedToCart: false,
  },
  {
    id: 7,
    brandName: "WROGN",
    description: "Slim Fit Casual shirt",
    details:
      "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
    image:
      "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/1758578/2017/5/12/11494569522819-WROGN-Men-Shirts-8521494569522516-1.jpg",
    offeredPrice: 1469,
    actualPrice: 2099,
    get discount() {
      return calculateDiscount(this.actualPrice, this.offeredPrice);
    },
    isWishlisted: false,
    isAddedToCart: false,
  },
];
