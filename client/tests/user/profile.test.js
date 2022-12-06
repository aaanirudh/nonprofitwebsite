import auth from "../../auth/auth-helper.js";
import { read } from "../../user/api-user.js";
import Profile from "../../user/Profile.js";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { prettyDOM } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
jest.mock("./../../auth/auth-helper.js");
jest.mock("./../../user/api-user.js");
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
const dummyOrgProfile = {
  _id: "5a3cb2399bcc621874d7e42f",
  name: "John Doe",
  organization: true,
  organizationName: "Vanderbilt University",
  about: "Aboutme",
};
const dummyStudentProfile = {
  _id: "5a3cb2399bcc621874d7e42f",
  name: "John Doe",
  organization: false,
  organizationName: "Vanderbilt University",
  about: "Aboutme",
};
describe("Testing Profile", () => {
  const user = userEvent.setup();
  auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

  it("Display text is expected", async () => {
    read.mockReturnValue(Promise.resolve(dummyOrgProfile));
    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Profile
            match={{
              params: {
                userId: "5a3cb2399bcc621874d7e42f",
              },
            }}
          ></Profile>
        </MemoryRouter>
      );
    });
    const element = screen.getByText("Joined: Invalid Date");

    expect(element).toBeDefined();
  });
  it("All user information is displayed", async () => {
    read.mockReturnValue(Promise.resolve(dummyOrgProfile));
    auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Profile
            match={{
              params: {
                userId: "5a3cb2399bcc621874d7e42f",
              },
            }}
          ></Profile>
        </MemoryRouter>
      );
    });
    let element = screen.getByText("John Doe (Organization)");
    expect(element).toBeDefined();
    element = screen.getByText("Vanderbilt University");
    expect(element).toBeDefined();
    element = screen.getByText("Aboutme");
    expect(element).toBeDefined();
  });
  it("Organization Profile", async () => {
    read.mockReturnValue(Promise.resolve(dummyOrgProfile));
    auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Profile
            match={{
              params: {
                userId: "5a3cb2399bcc621874d7e42f",
              },
            }}
          ></Profile>
        </MemoryRouter>
      );
    });
    const element = screen.getByText("John Doe (Organization)");

    expect(element).toBeDefined();
  });
  it("Can edit profile", async () => {
    read.mockReturnValue(Promise.resolve(dummyStudentProfile));
    auth.isAuthenticated.mockReturnValue(dummyMeAuthObject);

    const { container } = render(
      <MemoryRouter>
        <Profile
          match={{
            params: {
              userId: "5a3cb2399bcc621874d7e42f",
            },
          }}
        ></Profile>
      </MemoryRouter>
    );
    let vals = container.querySelector("button");

    expect(vals).toBeDefined();
  });
  it("Student profile", async () => {
    read.mockReturnValue(Promise.resolve(dummyStudentProfile));
    auth.isAuthenticated.mockReturnValue(dummyNotMeAuthObject);

    await act(async () => {
      const { container } = render(
        <MemoryRouter>
          <Profile
            match={{
              params: {
                userId: "5a3cb2399bcc621874d7e42f",
              },
            }}
          ></Profile>
        </MemoryRouter>
      );
    });
    const element = screen.getByText("John Doe (Student)");

    expect(element).toBeDefined();
  });
});
