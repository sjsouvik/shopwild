const baseUrl = process.env.REACT_APP_BACKEND;

export const endpoints = {
  login: `${baseUrl}/login`,
  products: `${baseUrl}/product`,
  wishlist: `${baseUrl}/wishlist/:userId`,
  cart: `${baseUrl}/cart/:userId`,
};
