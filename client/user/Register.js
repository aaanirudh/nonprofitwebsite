import React, { useState } from "react";
import { create } from "./api-user.js";
import { Link, useLocation } from "react-router-dom";
/**
 * Register (parent: MainRouter)
 * @returns {Object} - Register page
 */
export default function Register() {
  let loc = useLocation();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    organization: loc.state == null ? false : loc.state,
  });

  //handle change to update input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //submit user to api-user when registering
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      organization: values.organization,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  //change user type between user and organization
  const changeUser = (event, nextView) => {
    setValues({ ...values, organization: event.target.value === "true" });
  };

  return (
    <div>
      <h6>Register</h6>
      <button onClick={changeUser} value="false">
        Student
      </button>
      <button onClick={changeUser} value="true">
        Organization
      </button>
      <p>Registering as {values.organization ? "organization" : "student"}</p>
      <div>
        <input
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange("name")}
        />
        <br />
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange("email")}
        />
        <br />
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange("password")}
        />
      </div>
      <br /> {values.error && <p>{values.error}</p>}
      <button color="primary" variant="contained" onClick={clickSubmit}>
        Submit
      </button>
      {values.open && (
        <>
          <p>
            {values.organization ? "Organization created." : "User created."}
          </p>

          <Link to="/login">
            <button color="primary" autoFocus="autoFocus" variant="contained">
              Log In
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
