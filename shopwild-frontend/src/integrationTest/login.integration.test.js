import { render, act, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");

describe("Integration test for login", () => {
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

    window.localStorage.removeItem("login");
  });

  test("should allow the user to login if the user is registered", async () => {
    const user = {
      email: "test@gmail.com",
      firstName: "User",
      lastName: "Auth Testing",
      _id: "123",
    };
    const data = { token: "token123", user };
    axios.post.mockResolvedValue({ data, status: 200 });

    render(<App />);

    fireEvent.click(screen.getByText(/log in/i));
    expect(window.location.href).toContain("login");
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByText(/login/i);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    await act(async () => fireEvent.click(loginBtn));

    expect(window.localStorage.getItem("login")).toBe(JSON.stringify(data));
    expect(screen.getByText(`Hi, ${user.firstName}`)).toBeDefined();
  });

  test("should show error message to the user if the user is not registered", async () => {
    axios.post.mockRejectedValue({
      response: { status: 401 },
    });

    render(<App />);

    fireEvent.click(screen.getByText(/log in/i));

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByText(/login/i);
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    await act(async () => fireEvent.click(loginBtn));

    expect(window.location.href).toContain("login");
    expect(
      screen.getByText(/invalid email and password combination/i)
    ).toBeDefined();
  });
});
