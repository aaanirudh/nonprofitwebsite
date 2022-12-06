import auth from "../../auth/auth-helper.js";
import Course from "../../courses/Course.js";
import { like } from "../../courses/api-courses.js";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/auth-helper.js");
jest.mock("./../../courses/api-courses.js");
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
describe("Testing Course", () => {
  const user = userEvent.setup();
  it("Check course content", () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyAuthObject);
    // const component = renderer.create(
    //   <MemoryRouter>
    //     <Course course={post} key={post._id}></Course>
    //   </MemoryRouter>
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    const { container } = render(
      <MemoryRouter>
        <Course course={post} key={post._id}></Course>
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
    // const component = renderer.create(
    //   <MemoryRouter>
    //     <Course course={post} key={post._id}></Course>
    //   </MemoryRouter>
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    const { container } = render(
      <MemoryRouter>
        <Course course={post} key={post._id}></Course>
      </MemoryRouter>
    );

    const element = container.querySelector("icon");

    expect(element).toBeDefined();
  });
  it("Is not original poster", () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyNotMeAuthObject);
    // const component = renderer.create(
    //   <MemoryRouter>
    //     <Course course={post} key={post._id}></Course>
    //   </MemoryRouter>
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    const { container } = render(
      <MemoryRouter>
        <Course course={post} key={post._id}></Course>
      </MemoryRouter>
    );
  });
  it("Like a post", async () => {
    const post = dummyPostObject;
    auth.isAuthenticated.mockReturnValue(dummyAuthObject);
    like.mockReturnValue(Promise.resolve({ test: "tests" }));
    // const component = renderer.create(
    //   <MemoryRouter>
    //     <Course course={post} key={post._id}></Course>
    //   </MemoryRouter>
    // );
    // let tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
    const { container } = render(
      <MemoryRouter>
        <Course course={post} key={post._id}></Course>
      </MemoryRouter>
    );

    let element = container.querySelector("button.makeStyles-likeButton-62");
    expect(element).toBeDefined();
    await user.click(element);

    element = screen.getByText("1 like");
    expect(element).toBeDefined();
  });
});
