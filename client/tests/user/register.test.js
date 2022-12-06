import auth from "../../auth/auth-helper.js";
import { create, getOrganizations } from "../../user/api-user.js";
import Register from "../../user/Register.js";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../user/api-user.js");
jest.mock("./../../auth/auth-helper.js");
describe("Testing Register", () => {
  const user = userEvent.setup();

  it("Empty Entry", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ error: "Name is required" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    // let username = screen.getByLabelText("Email");
    let submit = screen.getByText("Student Memberships");
    // await user.type(username, "kev");
    await user.click(submit);
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Name is required");

    expect(element).toBeDefined();
  });

  it("Empty email", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ error: "Email is required" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    // let username = screen.getByLabelText("Email");
    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Email is required");

    expect(element).toBeDefined();
  });

  it("Invalid email", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(
      Promise.resolve({ error: "Please fill a valid email address" })
    );

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    let email = screen.getByLabelText("Email");
    await user.type(email, "testname");
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Please fill a valid email address");

    expect(element).toBeDefined();
  });

  it("Name and email", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ error: "Password is required" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    let email = screen.getByLabelText("Email");
    await user.type(email, "test@test.com");
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Password is required");

    expect(element).toBeDefined();
  });

  it("Name and email, Password", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ error: "Passwords must match" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    let email = screen.getByLabelText("Email");
    await user.type(email, "test@test.com");
    let password = screen.getByLabelText("Password");
    await user.type(password, "pward");
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Passwords must match");

    expect(element).toBeDefined();
  });

  it("Name and email, Password and unmatching cPassword", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ error: "Passwords must match" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    let email = screen.getByLabelText("Email");
    await user.type(email, "test@test.com");
    let password = screen.getByLabelText("Password");
    await user.type(password, "pward");
    let cpassword = screen.getByLabelText("Confirm Password");
    await user.type(cpassword, "cpward");
    submit = screen.getByText("Submit");
    await user.click(submit);

    const element = screen.getByText("Passwords must match");

    expect(element).toBeDefined();
  });

  it("Name and email, Password and matching cPassword", async () => {
    getOrganizations.mockReturnValue(
      Promise.resolve(["Vanderbilt University"])
    );
    create.mockReturnValue(Promise.resolve({ success: "Success" }));

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Register></Register>
        </MemoryRouter>
      );
    });

    let submit = screen.getByText("Student Memberships");
    await user.click(submit);
    let username = screen.getByLabelText("Full Name");
    await user.type(username, "testname");
    let email = screen.getByLabelText("Email");
    await user.type(email, "test@test.com");
    let password = screen.getByLabelText("Password");
    await user.type(password, "pward");
    let cpassword = screen.getByLabelText("Confirm Password");
    await user.type(cpassword, "pward");
    submit = screen.getByText("Submit");
    await user.click(submit);
  });
});
