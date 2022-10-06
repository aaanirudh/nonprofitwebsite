import React, { useState } from "react";
import auth from "./auth-helper";
import { Redirect } from "react-router-dom";
import { login } from "./api-auth.js";

/**
 * Login page that redirects to home page when successful
 * @param  {Object} props - From MainRouter.js
 *                          location : location information from router
 *
 * @returns {Object} - Login page
 *
 */
export default function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    organization: false,
    location: "",
    instrument: "",
    redirectToReferrer: false,
  });

  /**
   * Prepares object for API Login request. Displays error when unsuccessful and redirects to homepage if successful
   * @param  {Object} event - Information about click occurance
   *
   */
  const clickSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    login(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, error: "", redirectToReferrer: true });
        });
      }
    });
  };

  /**
   * Update state to display input changes in login form
   * @param  {String} name - Name of text and state to be changed
   *
   */
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  /**
   * Determines destination of redirect upon login attempt
   */
  const { from } = props.location.state || {
    from: {
      pathname: "/",
    },
  };

  const { redirectToReferrer } = values;

  /**
   * Redirect to homepage on successful login only
   */
  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  return (
    <form onSubmit={clickSubmit}>
      <h6>Log In</h6>
      <input
        id="email"
        type="email"
        placeholder="Email"
        value={values.email}
        onChange={handleChange("email")}
        margin="normal"
      />
      <br />
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={handleChange("password")}
        margin="normal"
      />
      <br /> {values.error && <p>{values.error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
