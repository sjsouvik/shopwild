import { render, act, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { endpoints } from "../common/endpoints";
import { loggedInUserDetails } from "../mocks/testData";
import { server, rest } from "../mocks/testServer";

describe("Integration test for login", () => {
  beforeEach(() => {
    window.localStorage.removeItem("login");
  });

  test("should allow the user to login if the user is registered", async () => {
    // const user = {
    //   email: "test@gmail.com",
    //   firstName: "User",
    //   lastName: "Auth Testing",
    //   _id: "123",
    // };
    // const data = { token: "token123", user };
    // axios.post.mockResolvedValue({ data, status: 200 });

    render(<App />);

    fireEvent.click(screen.getByText(/log in/i));
    expect(window.location.href).toContain("login");
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId("loginButton");
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    await act(async () => fireEvent.click(loginBtn));

    expect(window.localStorage.getItem("login")).toBe(
      JSON.stringify(loggedInUserDetails)
    );
    expect(
      screen.getByText(`Hi, ${loggedInUserDetails.user.firstName}`)
    ).toBeInTheDocument();
  });

  test("should show error message to the user if the user is not registered", async () => {
    server.use(
      rest.post(endpoints.login, (req, res, ctx) => {
        return res(ctx.status(401));
      })
    );

    render(<App />);

    fireEvent.click(screen.getByRole("link", { name: /log in/i }));

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const loginBtn = screen.getByTestId("loginButton");

    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    await act(async () => fireEvent.click(loginBtn));

    expect(window.location.href).toContain("login");
    expect(
      screen.getByText(/invalid email and password combination/i)
    ).toBeInTheDocument();
  });
});
