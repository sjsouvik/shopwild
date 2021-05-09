export const dataReducer = (state, { type, payload }) => {
  switch (type) {
    case "INITIALIZE_DATA":
      return {
        ...state,
        [payload.name]: payload.data,
      };

    case "ENABLE_OR_DISABLE_TOAST":
      return {
        ...state,
        toastMessage: payload.message,
      };

    case "ADD_TO_WISHLIST":
      const wishlistProduct = isProductExistsInList(state.wishlist, payload);

      return {
        ...state,
        wishlist: wishlistProduct
          ? state.wishlist
          : [...state.wishlist, payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.product.id !== payload
        ),
      };

    case "ADD_TO_CART":
      const cartProduct = isProductExistsInList(state.cart, payload);

      return {
        ...state,
        cart: cartProduct ? state.cart : [...state.cart, payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,

        cart: state.cart.filter((cartItem) => cartItem.product.id !== payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === payload
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        ),
      };

    default:
      return state;
  }
};

export const isProductExistsInList = (list, payload) => {
  return list.find((item) => item.product.id === payload.product.id);
};
