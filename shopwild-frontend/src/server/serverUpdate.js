import serverRequests from "./serverRequests";

export const addToWishlist = async (dispatch, product) => {
  const { error } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/wishlist/607d92eee69f8b99745ef728`,
    data: { products: [{ product: product.id, isWishlisted: true }] },
  });

  if (!error) {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: { product, isWishlisted: true },
    });
  }

  return !error;
};

export const removeFromWishlist = async (dispatch, product) => {
  const { error } = await serverRequests({
    requestType: "delete",
    url: `${process.env.REACT_APP_BACKEND}/wishlist/607d92eee69f8b99745ef728`,
    data: { product: product.id },
  });

  if (!error) {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
  }

  return !error;
};

export const addToCart = async (dispatch, product) => {
  const { error } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
    data: { products: [{ product: product.id, quantity: 1 }] },
  });

  if (!error) {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  }

  return !error;
};

export const removeFromCart = async (dispatch, product) => {
  const { error } = await serverRequests({
    requestType: "delete",
    url: `${process.env.REACT_APP_BACKEND}/cart/607d92eee69f8b99745ef728`,
    data: { product: product.id },
  });

  if (!error) {
    dispatch({ type: "REMOVE_FROM_CART", payload: product.id });
  }

  return !error;
};
