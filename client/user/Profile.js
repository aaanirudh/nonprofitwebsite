import React, { useState, useEffect } from "react";
import DeleteUser from "./DeleteUser";
import auth from "../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";

/**
 * Profile (parent: MainRouter)
 * @param {Object} {match} -  item    : post object
 *                          onRemove : parent function to remove a post
 *
 * @returns {Object} - Profile page
 */
export default function Profile({ match }) {
  const [values, setValues] = useState({
    user: {},
    redirectToLogin: false,
  });

  const jwt = auth.isAuthenticated();

  //Read user information on mount
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
      if (data && data.error) {
        setValues({ ...values, redirectToLogin: true });
      } else {
        setValues({ ...values, user: data });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  //Redirect to login if error
  if (values.redirectToLogIn) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h6>Profile</h6>

      <ul>
        <li>
          <img
            src={
              values.user._id
                ? `/api/users/photo/${values.user._id}?${new Date().getTime()}`
                : "/api/users/defaultphoto"
            }
          />
          <p>
            {values.user.name +
              " (" +
              (values.user.organization ? "Organization" : "Student") +
              ")"}
          </p>
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id == values.user._id && (
              <p>
                <Link to={"/user/edit/" + values.user._id}>
                  <h6 aria-label="Edit" color="primary">
                    Edit
                  </h6>
                </Link>

                <DeleteUser userId={values.user._id} />
              </p>
            )}
        </li>

        <br />

        <li>
          <p>{values.user.about}</p>
        </li>
        <li>{"Joined: " + new Date(values.user.created).toDateString()}</li>
      </ul>
    </div>
  );
}
