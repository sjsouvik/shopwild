import { render, act, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Integration test for AllProducts component", () => {
  test("should render all the products with filters properly", async () => {
    await act(async () => render(<App />));

    expect(screen.queryByTestId("productLoader")).toBeNull();

    const productCards = screen.getAllByTestId("productCard");
    const sideFilter = screen.getByTestId("sideFilter");

    expect(productCards.length).toBe(2);
    expect(sideFilter).toBeDefined();
  });

  test("should sort, filter the products by brand, discount", async () => {
    await act(async () => render(<App />));

    const discountCheckBoxes20 = screen.getAllByLabelText(/20% or above/i);
    const discountCheckBoxes40 = screen.getAllByLabelText(/40% or above/i);
    fireEvent.click(discountCheckBoxes20[0]);

    const productCards = screen.getAllByTestId("productCard");
    expect(productCards.length).toBe(2);

    const clearAllOptions = screen.getAllByText(/clear all/i);
    fireEvent.click(clearAllOptions[0]);
    fireEvent.click(discountCheckBoxes40[0]);
    expect(screen.queryAllByTestId("productCard").length).toBe(0);

    fireEvent.click(clearAllOptions[0]);
    const brandRoadsterCkBoxes = screen.getAllByLabelText(/roadster/i);
    fireEvent.click(brandRoadsterCkBoxes[0]);
    expect(screen.getAllByTestId("productCard").length).toBe(1);

    fireEvent.click(clearAllOptions[0]);
    const highToLowBtns = screen.getAllByLabelText(/price - high to low/i);
    const lowToHighBtns = screen.getAllByLabelText(/price - low to high/i);
    fireEvent.click(lowToHighBtns[0]);

    //TODO: check how to test the order of products after sorting
    const products = screen.getAllByTestId("productCard");
    expect(products.length).toBe(2);

    fireEvent.click(highToLowBtns[0]);

    // expect(products[0]).toHaveTextContent("2249");
    // expect(products[1]).toHaveTextContent("2599");
  });
});
