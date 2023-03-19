import { act, render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("Integration test for profile", () => {
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

  test("should render the profile page and logout the user on click of logout button", async () => {
    await act(async () => render(<App />));

    const loginProfileLink = screen.getByTestId("loginProfileLink");
    await act(async () => fireEvent.click(loginProfileLink));
    expect(window.location.href).toContain("profile");

    const logoutBtn = screen.getByTestId("logoutButton");
    fireEvent.click(logoutBtn);
    fireEvent.click(loginProfileLink);
    expect(window.location.href).toContain("login");
  });
});
