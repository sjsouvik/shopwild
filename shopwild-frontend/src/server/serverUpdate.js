import serverRequests from "./serverRequests";

export const loginWithCreds = async (email, password) => {
  const { response, statusCode } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/login`,
    data: { email: email, password: password },
  });

  if (statusCode === 401 || statusCode === 400 || statusCode === 422) {
    return { error: true, message: "Invalid email and password combination" };
  }

  if (statusCode !== 200) {
    return { error: true, message: "Something went wrong" };
  }

  return response && response.data ? { data: response.data } : { data: null };
};

export const signup = async (firstName, lastName, email, password) => {
  const { statusCode } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/signup`,
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
  });

  if (statusCode === 422) {
    return {
      error: true,
      message: "Give a valid email to register",
    };
  }

  if (statusCode === 409) {
    return {
      error: true,
      message: "This email is already registered",
    };
  }

  if (statusCode !== 200) {
    return { error: true, message: "Something went wrong" };
  }

  return { message: "Successfully registered" };
};

export const addToWishlist = async (dispatch, product, userId, token) => {
  const { statusCode } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/wishlist/${userId}`,
    data: { product: product._id },
    token: { headers: { authorization: `Bearer ${token}` } },
  });

  if (statusCode === 200) {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: { product },
    });
  }

  return statusCode === 200;
};

export const removeFromWishlist = async (dispatch, product, userId, token) => {
  const { error } = await serverRequests({
    requestType: "delete",
    url: `${process.env.REACT_APP_BACKEND}/wishlist/${userId}`,
    token: {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { product: product._id },
    },
  });

  if (!error) {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product._id });
  }

  return !error;
};

export const addToCart = async (dispatch, product, userId, token) => {
  const { statusCode } = await serverRequests({
    requestType: "post",
    url: `${process.env.REACT_APP_BACKEND}/cart/${userId}`,
    data: { product: product._id, quantity: 1 },
    token: { headers: { authorization: `Bearer ${token}` } },
  });

  if (statusCode === 200) {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  }

  return statusCode === 200;
};

export const removeFromCart = async (dispatch, product, userId, token) => {
  const { error } = await serverRequests({
    requestType: "delete",
    url: `${process.env.REACT_APP_BACKEND}/cart/${userId}`,
    token: {
      headers: {
        authorization: `Bearer ${token}`,
      },
      data: { product: product._id },
    },
  });

  if (!error) {
    dispatch({ type: "REMOVE_FROM_CART", payload: product._id });
  }

  return !error;
};
