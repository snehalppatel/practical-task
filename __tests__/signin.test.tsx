import Signin from "@/app/signin/page";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock useRouter hook
jest.mock("next/navigation", () => ({
  useRouter() {
    return { push: jest.fn() };
  },
}));

describe("Signin page", () => {
  beforeEach(() => render(<Signin />));

  it("should render the form", () => {
    const form = screen.getByRole("form");
    expect(form).toBeInTheDocument();
  });

  it("should render the username input", () => {
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  it("should render the password input", () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render the password input with type "password"', () => {
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should render the submit button", () => {
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should render the submit button with type "submit"', () => {
    const submitButton = screen.getByRole("button", { name: /sign in/i });
    expect(submitButton).toHaveAttribute("type", "submit");
  });

  //// Submit function logic

  it("should display error message on submission validation failure", async () => {
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.input(usernameInput, { target: { value: "t" } }); // Invalid username, less than 3 characters
    fireEvent.input(passwordInput, { target: { value: "pass" } }); // Invalid password, less than 6 characters

    fireEvent.click(submitButton);

    await waitFor(() => {
      const usernameErrorHelperText = screen.getByText(
        /Username must be at least 3 characters/i
      );
      const passwordErrorHelperText = screen.getByText(
        /Password must be at least 6 characters/i
      );

      // Check if the inputs are error variant by mui
      const usernameInputInvalid = usernameInput.getAttribute("aria-invalid");
      const passwordInputInvalid = passwordInput.getAttribute("aria-invalid");

      expect(usernameErrorHelperText).toBeInTheDocument();
      expect(usernameInputInvalid).toBe("true");
      expect(passwordErrorHelperText).toBeInTheDocument();
      expect(passwordInputInvalid).toBe("true");
    });
  });

  it("should redirect to home page on successful sign in", async () => {
    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    fireEvent.input(usernameInput, { target: { value: "testuser" } });
    fireEvent.input(passwordInput, { target: { value: "password" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
