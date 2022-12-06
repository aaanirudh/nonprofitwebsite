import auth from "../../auth/auth-helper.js";
import { create } from "../../courses/api-courses.js";
import NewCourse from "../../courses/NewCourse.js";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/auth-helper.js");
jest.mock("./../../courses/api-courses.js");
const dummyMeAuthObject = {
  user: { _id: "5a3cb1779bcc621874d7e428", name: "Joe", email: "abc@def.com" },
};
describe("Testing New Course", () => {
  const user = userEvent.setup();
  auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

  it("No entries", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Title is required" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewCourse></NewCourse>
        </MemoryRouter>
      );
    });
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    const element = screen.getByText("Link is required.");

    expect(element).toBeDefined();
  });
  it("No title", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Title is required" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewCourse></NewCourse>
        </MemoryRouter>
      );
    });

    let description = screen.getByPlaceholderText("Description...");
    await user.type(description, "testdescription");
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();

    const element = screen.getByText("Link is required.");
    expect(element).toBeDefined();
  });
  it("No body", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Body is required" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewCourse></NewCourse>
        </MemoryRouter>
      );
    });

    let title = screen.getByPlaceholderText("Title...");
    await user.type(title, "testname");
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();

    const element = screen.getByText("Link is required.");
    expect(element).toBeDefined();
  });
  it("No body", async () => {
    create.mockReturnValue(Promise.resolve({ val: "test" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewCourse></NewCourse>
        </MemoryRouter>
      );
    });

    let title = screen.getByPlaceholderText("Title...");
    await user.type(title, "testname");
    let description = screen.getByPlaceholderText("Description...");
    await user.type(description, "testdescription");
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();
  });
});
