import { render, act, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Integration test for wishlist", () => {
  beforeEach(() => {
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

  test("should render all products, add some products to wishlist and remove product from wishlist", async () => {
    await act(async () => render(<App />));

    const wishlistBtns = screen.getAllByTestId("wishlistButton");
    await act(async () => fireEvent.click(wishlistBtns[0]));
    const toastMessage = screen.getByText(/item has been wishlisted!/i);
    expect(toastMessage).toBeInTheDocument();

    const wishlistLink = screen.getByRole("link", { name: /wishlist/i });
    await act(async () => fireEvent.click(wishlistLink));

    expect(window.location.href).toContain("wishlist");

    const wishlistedProducts = screen.getAllByTestId("productCard");
    expect(wishlistedProducts.length).toBe(1);

    const removeFromWishlistBtns = screen.getAllByTestId("removeButton");
    await act(async () => fireEvent.click(removeFromWishlistBtns[0]));
    expect(screen.queryAllByTestId("productCard").length).toBe(0);
  });

  test("should move the product from wishlist to cart on click of move to cart button", async () => {
    await act(async () => render(<App />));

    const allProductsLink = screen.getByTestId("allProductsLink");
    await act(async () => fireEvent.click(allProductsLink));
    const wishlistBtns = screen.getAllByTestId("wishlistButton");
    await act(async () => fireEvent.click(wishlistBtns[0]));
    const wishlistLink = screen.getByTestId("wishlistLink");
    await act(async () => fireEvent.click(wishlistLink));

    const moveToCartBtns = screen.getAllByTestId("cartButton");
    await act(async () => fireEvent.click(moveToCartBtns[0]));

    const cartLink = screen.getByTestId("cartLink");
    await act(async () => fireEvent.click(cartLink));

    const cartProducts = screen.getAllByTestId("cartProduct");
    expect(cartProducts.length).toBe(1);
  });
});
