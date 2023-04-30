import { dataState, dataReducer } from "./dataReducer";

describe("testing wishlist", () => {
  test("should add an item to wishlist when ADD_TO_WISHLIST action is dispatched", () => {
    const action = {
      type: "ADD_TO_WISHLIST",
      payload: {
        product: {
          _id: "1",
          name: "Roadster",
          price: 100,
        },
      },
    };

    let updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
        },
      ],
      cart: [],
      toastMessage: null,
    });

    updatedState = dataReducer(updatedState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
        },
      ],
      cart: [],
      toastMessage: null,
    });
  });

  test("should remove an item from wishlist when REMOVE_FROM_WISHLIST action is dispatched", () => {
    const dataState = {
      allProducts: [],
      wishlist: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
        },
      ],
      cart: [],
      toastMessage: null,
    };

    let action = {
      type: "REMOVE_FROM_WISHLIST",
      payload: "1",
    };

    const updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
        },
      ],
      cart: [],
      toastMessage: null,
    });
  });
});

describe("testing cart", () => {
  test("should add an item to cart when ADD_TO_CART action is dispatched", () => {
    const action = {
      type: "ADD_TO_CART",
      payload: {
        product: {
          _id: "1",
          name: "Roadster",
          price: 100,
        },
        quantity: 1,
      },
    };

    let updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    });

    updatedState = dataReducer(updatedState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    });
  });

  test("should remove an item from cart when REMOVE_FROM_CART action is dispatched", () => {
    const dataState = {
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    };

    const action = {
      type: "REMOVE_FROM_CART",
      payload: "2",
    };

    const updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    });
  });

  test("should increase the quantity of the item in the cart when INCREASE_QUANTITY action is dispatched", () => {
    const dataState = {
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    };

    const action = {
      type: "INCREASE_QUANTITY",
      payload: "1",
    };

    const updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 2,
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    });
  });

  test("should decrease quantity of the item in the cart when DECREASE_QUANTITY action is dispatched", () => {
    const dataState = {
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
          quantity: 2,
        },
      ],
      toastMessage: null,
    };

    const action = {
      type: "DECREASE_QUANTITY",
      payload: "2",
    };

    const updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [
        {
          product: {
            _id: "1",
            name: "Roadster",
            price: 100,
          },
          quantity: 1,
        },
        {
          product: {
            _id: "2",
            name: "Dennis Lingo",
            price: 500,
          },
          quantity: 1,
        },
      ],
      toastMessage: null,
    });
  });
});

describe("testing toast", () => {
  test("should enable or disable toast when ENABLE_OR_DISABLE_TOAST action is dispatched", () => {
    let action = {
      type: "ENABLE_OR_DISABLE_TOAST",
      payload: { message: "Toast is enabled" },
    };

    let updatedState = dataReducer(dataState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [],
      toastMessage: "Toast is enabled",
    });

    action = {
      type: "ENABLE_OR_DISABLE_TOAST",
      payload: { message: null },
    };

    updatedState = dataReducer(updatedState, action);

    expect(updatedState).toEqual({
      allProducts: [],
      wishlist: [],
      cart: [],
      toastMessage: null,
    });
  });
});
