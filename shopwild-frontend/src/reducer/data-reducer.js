export const dataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_DATA":
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };

    case "ADD_TO_WISHLIST":
      const wishlistProduct = isProductExistsInList(
        state.wishlist,
        action.payload
      );
      console.log(state.wishlist, wishlistProduct);
      return {
        ...state,
        wishlist: wishlistProduct
          ? state.wishlist
          : [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.product.id !== action.payload
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,

        cart: state.cart.filter(
          (cartItem) => cartItem.product.id !== action.payload
        ),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === action.payload
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.product.id === action.payload
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
