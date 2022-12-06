import auth from "../../auth/auth-helper.js";
import { login } from "../../auth/api-auth.js";
import Login from "../../auth/Login.js";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/api-auth.js");
jest.mock("./../../auth/auth-helper.js");
describe("Testing Login", () => {
  const user = userEvent.setup();

  it("Invalid username", async () => {
    login.mockReturnValue(Promise.resolve({ error: "User not found" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let submit = screen.getByText("Submit");
    await user.type(username, "kev");
    await user.click(submit);
    expect(login).toBeCalledTimes(0);
  });
  it("Empty fields", async () => {
    login.mockReturnValue(Promise.resolve({ error: "User not found" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let submit = screen.getByText("Submit");
    await user.click(submit);
    const element = screen.getByText("User not found");
    expect(element).toBeDefined();
  });

  it("Username only", async () => {
    login.mockReturnValue(Promise.resolve({ error: "User not found" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let password = screen.getByLabelText("Password");
    let submit = screen.getByText("Submit");
    await user.type(username, "test@test.com");
    await user.click(submit);
    const element = screen.getByText("User not found");

    expect(element).toBeDefined();
  });

  it("All fields are updated/populated as expected", async () => {
    login.mockReturnValue(Promise.resolve({ error: "User not found" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let password = screen.getByLabelText("Password");
    let submit = screen.getByText("Submit");
    await user.type(username, "test@test.com");
    await user.type(password, "test");
    await user.click(submit);
    const element = screen.getByText("Submit");

    expect(element).toBeDefined();
  });

  it("All fields exist for invalid user", async () => {
    login.mockReturnValue(Promise.resolve({ error: "User not found" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let password = screen.getByLabelText("Password");
    let submit = screen.getByText("Submit");
    await user.type(username, "test@test.com");
    await user.type(password, "test");
    await user.click(submit);
    const element = screen.getByText("User not found");

    expect(element).toBeDefined();
  });

  it("All fields exist for valid user and invalid password", async () => {
    login.mockReturnValue(Promise.resolve({ error: "Incorrect Password" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let password = screen.getByLabelText("Password");
    let submit = screen.getByText("Submit");
    await user.type(username, "test@test.com");
    await user.type(password, "test1");
    await user.click(submit);
    const element = screen.getByText("Incorrect Password");

    expect(element).toBeDefined();
  });

  it("All fields exist for valid user and password", async () => {
    login.mockReturnValue(
      Promise.resolve({ user: "test", email: "test@test.com" })
    );
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Login location={{}}></Login>
        </MemoryRouter>
      );
    });
    let username = screen.getByLabelText("Email");
    let password = screen.getByLabelText("Password");
    let submit = screen.getByText("Submit");
    await user.type(username, "test@test.com");
    await user.type(password, "test");
    await user.click(submit);
    const element = screen.getByText("Submit");

    expect(element).toBeDefined();
  });
});
