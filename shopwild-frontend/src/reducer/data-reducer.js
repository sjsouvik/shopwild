export const dataReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_DATA":
      return {
        ...state,
        [action.payload.name]: action.payload.data,
      };

    case "MARK_WISHLIST_PRODUCTS":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          state.wishlist.find(
            (item) => item.product.id === product.id && item.isWishlisted
          )
            ? { ...product, isWishlisted: true }
            : product
        ),
      };

    case "MARK_CART_PRODUCTS":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          state.cart.find(
            (item) => item.product.id === product.id && item.quantity > 0
          )
            ? { ...product, isAddedToCart: true }
            : product
        ),
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload.product.id
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
          (wishlistItem) => wishlistItem.product.id !== action.payload
        ),
      };

    case "ADD_TO_CART":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload.product.id
            ? { ...product, isAddedToCart: true }
            : product
        ),
        cart: state.cart.find(
          (item) => item.product.id === action.payload.product.id
        )
          ? state.cart
          : [...state.cart, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        allProducts: state.allProducts.map((product) =>
          product.id === action.payload
            ? { ...product, isAddedToCart: false }
            : product
        ),
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
