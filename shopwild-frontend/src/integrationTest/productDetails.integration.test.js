import { render, screen, fireEvent, act } from "@testing-library/react";
import App from "../App";

describe("Integration test for product details", () => {
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

  test("should render all details of a product, add to wishlist and cart on click of wishlist and add to cart button respectively", async () => {
    await act(async () => render(<App />));

    const productDetailsLink = screen.getAllByTestId("productDetailsLink");
    await act(async () => fireEvent.click(productDetailsLink[0]));

    expect(window.location.href).toContain("products");

    const wishlistBtn = screen.getByTestId("wishlistButton");
    await act(async () => fireEvent.click(wishlistBtn));
    expect(wishlistBtn.textContent).toBe("WISHLISTED");

    await act(async () => fireEvent.click(wishlistBtn));
    expect(wishlistBtn.textContent).toBe("WISHLIST");

    const cartBtn = screen.getByTestId("cartButton");
    await act(async () => fireEvent.click(cartBtn));
    expect(cartBtn.textContent).toBe("GO TO CART");

    await act(async () => fireEvent.click(cartBtn));
    expect(window.location.href).toContain("cart");
  });
});
