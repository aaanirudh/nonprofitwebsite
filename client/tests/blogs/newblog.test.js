import auth from "../../auth/auth-helper.js";
import { create } from "../../blogs/api-blog.js";
import NewBlog from "../../blogs/NewBlog.js";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/auth-helper.js");
jest.mock("./../../blogs/api-blog.js");
const dummyMeAuthObject = {
  user: { _id: "5a3cb1779bcc621874d7e428", name: "Joe", email: "abc@def.com" },
};
const dummyNotMeAuthObject = {
  user: {
    _id: "5a3cb2399bcc621874d7e42f",
    name: "John Doe",
    email: "abc@def.com",
  },
};
describe("Testing New Blog", () => {
  const user = userEvent.setup();
  auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

  it("No entries", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Title is required" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewBlog></NewBlog>
        </MemoryRouter>
      );
    });
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    const element = screen.getByText("Title is required");

    expect(element).toBeDefined();
  });
  it("No title", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Link is required." }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewBlog></NewBlog>
        </MemoryRouter>
      );
    });

    let description = screen.getByPlaceholderText("Description...");
    await user.type(description, "testdescription");
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    // console.log(prettyDOM());
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();

    const element = screen.getByText("Link is required.");
    expect(element).toBeDefined();
  });
  it("No body", async () => {
    create.mockReturnValue(Promise.resolve({ error: "Link is required." }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewBlog></NewBlog>
        </MemoryRouter>
      );
    });

    let title = screen.getByPlaceholderText("Title...");
    await user.type(title, "testname");
    submit = screen.getByText("POST");
    await user.click(submit);
    submit = screen.getByText("Post");
    await user.click(submit);
    // console.log(prettyDOM());
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();

    const element = screen.getByText("Link is required.");
    expect(element).toBeDefined();
  });
  it("Valid", async () => {
    create.mockReturnValue(Promise.resolve({ val: "test" }));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <NewBlog></NewBlog>
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
    // console.log(prettyDOM());
    // const element = screen.getByText("Title is required");
    // expect(element).toBeDefined();
  });
});
