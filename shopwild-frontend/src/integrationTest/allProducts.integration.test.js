import { render, act, screen, fireEvent } from "@testing-library/react";

import App from "../App";
import axios from "axios";

jest.mock("axios");

describe("Integration test for AllProducts component", () => {
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
      },
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

  test("should render all the products with filters properly", async () => {
    await act(async () => render(<App />));

    expect(axios.get).toHaveBeenCalled();
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
