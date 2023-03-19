import { render, fireEvent, screen, act } from "@testing-library/react";
import App from "../App";

describe("Integration test for cart", () => {
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

  test("should render all products, add some products to cart and remove product from cart", async () => {
    await act(async () => render(<App />));

    const cartBtns = screen.getAllByRole("button", { name: /add to cart/i });
    await act(async () => fireEvent.click(cartBtns[0]));
    const toastMessage = screen.getByText(/added to cart!/i);
    expect(toastMessage).toBeInTheDocument();

    const cartLink = screen.getByRole("link", { name: /cart/i });
    await act(async () => fireEvent.click(cartLink));
    expect(window.location.href).toContain("cart");

    const cartProducts = screen.getAllByTestId("cartProduct");
    expect(cartProducts.length).toBe(1);

    const removeFromCartBtns = screen.getAllByRole("button", {
      name: /remove/i,
    });
    await act(async () => fireEvent.click(removeFromCartBtns[0]));
    expect(screen.queryAllByTestId("cartProduct").length).toBe(0);
  });

  test("should move the product from cart to wishlist on click of the move to wishlist button", async () => {
    await act(async () => render(<App />));

    const allProductsLink = screen.getByTestId("allProductsLink");
    await act(async () => fireEvent.click(allProductsLink));
    const cartBtns = screen.getAllByRole("button", { name: /add to cart/i });
    await act(async () => fireEvent.click(cartBtns[0]));
    await act(async () => fireEvent.click(cartBtns[0]));

    const moveToWishlistBtns = screen.getAllByRole("button", {
      name: /move to wishlist/i,
    });
    await act(async () => fireEvent.click(moveToWishlistBtns[0]));

    const wishlistLink = screen.getByRole("link", { name: /wishlist/i });
    await act(async () => fireEvent.click(wishlistLink));

    const wishlistedProducts = screen.getAllByTestId("productCard");
    expect(wishlistedProducts.length).toBe(1);
  });
});
