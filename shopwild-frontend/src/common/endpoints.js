const baseUrl = process.env.REACT_APP_BACKEND;

export const endpoints = {
  products: `${baseUrl}/product`,
  wishlist: `${baseUrl}/wishlist/:userId`,
  cart: `${baseUrl}/cart/:userId`,
};
