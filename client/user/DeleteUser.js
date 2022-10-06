import React, { useState } from "react";
import auth from "./../auth/auth-helper";
import { remove } from "./api-user.js";
import { Redirect } from "react-router-dom";

/**
 * DeleteUser (parent: Profile)
 * @param {Object} props -  userId : id of user to be deleted
 *
 * @returns {Object} - Button and confirm window to delete own user
 */
export default function DeleteUser(props) {
  const [redirect, setRedirect] = useState(false);

  const jwt = auth.isAuthenticated();

  //call api-post remove function to delete account
  const deleteAccount = () => {
    remove(
      {
        userId: props.userId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };

  //redirect to homepage
  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <button aria-label="Delete" onClick={deleteAccount}>
        Delete Account (deletes account, no safety yet)
      </button>
    </span>
  );
}
