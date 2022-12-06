import auth from "../../auth/auth-helper.js";
import Post from "../../blogs/Post.js";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/auth-helper.js");
const dummyPostObject = {
  _id: "5a3cb2399bcc621874d7e42f",
  postedBy: { _id: "5a3cb1779bcc621874d7e428", name: "Joe" },
  title: "hey!",
  link: "youtube",
  created: "2017-12-22T07:20:25.611Z",
  comments: [],
  likes: [],
};
const dummyAuthObject = {
  user: { _id: "5a3cb1779bcc621874d7e428", name: "Joe", email: "abc@def.com" },
};
const dummyNotMeAuthObject = {
  user: {
    _id: "5a3ca1779bcc621874d7e428",
    name: "NotJoe",
    email: "abc@def.com",
  },
};
describe("Testing Post", () => {
  it("Check post content", () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyAuthObject);
    const { container } = render(
      <MemoryRouter>
        <Post blog={post} key={post._id}></Post>
      </MemoryRouter>
    );

    let element = screen.getByText("hey!");
    expect(element).toBeDefined();
    element = screen.getByText("Joe");
    expect(element).toBeDefined();
  });

  it("Is original poster", () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyAuthObject);
    const { container } = render(
      <MemoryRouter>
        <Post blog={post} key={post._id}></Post>
      </MemoryRouter>
    );

    const element = container.querySelector("icon");

    expect(element).toBeDefined();
  });
  it("Is not original poster", () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyNotMeAuthObject);
    const { container } = render(
      <MemoryRouter>
        <Post blog={post} key={post._id}></Post>
      </MemoryRouter>
    );
  });
});
