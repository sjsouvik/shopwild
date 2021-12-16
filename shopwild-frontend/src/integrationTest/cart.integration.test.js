import { render, fireEvent, screen, act } from "@testing-library/react";
import App from "../App";

import axios from "axios";

jest.mock("axios");

describe("Integration test for cart", () => {
  beforeEach(() => {
    const allProducts = [
      {
        id: "2131",
        brandName: "Roadster",
        description: "Slim Fit Casual shirt",
        details:
          "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
        image:
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/1291760/2017/12/5/11512469309068-Highlander-Dark-Green-Slim-Fit-Casual-Shirt-5071512469308877-3.jpg",
        offeredPrice: 1699,
        actualPrice: 2599,
        discount: 34,
      },
      {
        id: "2132",
        brandName: "Dennis Lingo",
        description: "Slim Fit Casual shirt",
        details:
          "Casual shirt, has a spread collar, long sleeves, curved hem, one patch pocket",
        image:
          "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg",
        offeredPrice: 1628,
        actualPrice: 2249,
        discount: 28,
      },
    ];

    axios.get.mockResolvedValue({
      data: {
        product: allProducts,
        wishlist: [],
        cart: [],
      },
      status: 200,
    });

    axios.post.mockResolvedValue({
      status: 200,
    });

    window.localStorage.setItem(
      "login",
      JSON.stringify({
        token: "token123",
        user: {
          _id: "12",
          firstName: "test",
          lastName: "user",
          email: "test@gmail.com",
        },
      })
    );
  });

  test("should render all products, add some products to cart and remove product from cart", async () => {
    await act(async () => render(<App />));

    const cartBtns = screen.getAllByTestId("cartButton");
    await act(async () => fireEvent.click(cartBtns[0]));
    const toastMessage = screen.getByText(/added to cart!/i);
    expect(toastMessage).toBeDefined();

    const cartLink = screen.getByTestId("cartLink");
    await act(async () => fireEvent.click(cartLink));
    expect(window.location.href).toContain("cart");

    const cartProducts = screen.getAllByTestId("cartProduct");
    expect(cartProducts.length).toBe(1);

    const removeFromCartBtns = screen.getAllByTestId("removeButton");
    await act(async () => fireEvent.click(removeFromCartBtns[0]));
    expect(screen.queryAllByTestId("cartProduct").length).toBe(0);
  });

  test("should move the product to wishlist on click of move to wishlist button", async () => {
    await act(async () => render(<App />));

    const allProductsLink = screen.getByTestId("allProductsLink");
    await act(async () => fireEvent.click(allProductsLink));
    const cartBtns = screen.getAllByTestId("cartButton");
    await act(async () => fireEvent.click(cartBtns[0]));
    await act(async () => fireEvent.click(cartBtns[0]));

    const moveToWishlistBtns = screen.getAllByTestId("moveToWishlistButton");
    await act(async () => fireEvent.click(moveToWishlistBtns[0]));

    const wishlistLink = screen.getByTestId("wishlistLink");
    await act(async () => fireEvent.click(wishlistLink));

    const wishlistedProducts = screen.getAllByTestId("productCard");
    expect(wishlistedProducts.length).toBe(1);
  });
});
