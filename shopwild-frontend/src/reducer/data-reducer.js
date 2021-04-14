export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload.id
            ? { ...product, isWishlisted: true }
            : product
        ),
        wishlist: [...state.wishlist, action.payload],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload
            ? { ...product, isWishlisted: false }
            : product
        ),
        wishlist: state.wishlist.filter(
          (wishlistItem) => wishlistItem.id !== action.payload
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload.id
            ? { ...product, isAddedToCart: true }
            : product
        ),
        cart: [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload
            ? { ...product, isAddedToCart: false }
            : product
        ),
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, qty: cartItem.qty - 1 }
            : cartItem
        ),
      };

    default:
      return state;
  }
};
