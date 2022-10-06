import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";

/**
 * EditProfile (parent: MainRouter)
 * @param {Object} {match} - credentials from PrivateRoute
 *
 * @returns {Object} - Edit profile page
 */
export default function EditProfile({ match }) {
  const [values, setValues] = useState({
    name: "",
    about: "",
    photo: "",
    email: "",
    password: "",
    cpassword: "",
    redirectToProfile: false,
    error: "",
    id: "",
  });

  const jwt = auth.isAuthenticated();

  //Display user's current information on mount
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data & data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          name: data.name,
          email: data.email,
          about: data.about,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  //submit to api-user to update profile
  const clickSubmit = () => {
    //Check if password and confirm password match
    if (values.cpassword !== values.password) {
      setValues({ ...values, error: "Passwords must match" });
      return;
    }

    let userData = new FormData();
    values.name && userData.append("name", values.name);
    values.email && userData.append("email", values.email);
    values.passoword && userData.append("passoword", values.passoword);
    values.about && userData.append("about", values.about);
    values.photo && userData.append("photo", values.photo);

    update(
      {
        userId: match.params.userId,
      },
      {
        t: jwt.token,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, redirectToProfile: true });
      }
    });
  };

  //update state to new input changes
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const photoUrl = values.id
    ? `/api/users/photo/${values.id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  //redirect to user profile once updated
  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.id} />;
  }

  return (
    <div>
      <h6>Edit Profile</h6>
      <img src={photoUrl} />
      <br />
      <input
        accept="image/*"
        onChange={handleChange("photo")}
        id="icon-button-file"
        type="file"
      />
      <label htmlFor="icon-button-file">
        <button variant="contained" color="default" component="span">
          Upload
        </button>
      </label>{" "}
      <span>{values.photo ? values.photo.name : ""}</span>
      <br />
      <input
        id="name"
        placeholder="Name"
        value={values.name}
        onChange={handleChange("name")}
        margin="normal"
      />
      <br />
      <input
        id="multiline-flexible"
        placeholder="About"
        multiline
        rows="2"
        value={values.about}
        onChange={handleChange("about")}
        margin="normal"
      />
      <br />
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
        placeholder="New Password"
        value={values.password}
        onChange={handleChange("password")}
        margin="normal"
      />
      <input
        id="cpassword"
        type="password"
        placeholder="Confirm New Password"
        value={values.cpassword}
        onChange={handleChange("cpassword")}
        margin="normal"
      />
      <br /> {values.error && <p>{values.error}</p>}
      <button onClick={clickSubmit}>Submit</button>
    </div>
  );
}
