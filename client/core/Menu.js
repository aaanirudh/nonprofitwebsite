import React from "react";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import "./Menu.css";

/**
 * Change color of menu item when selected
 * @param  {Object} history - history from router
 * @param  {Object} path - intended path for link
 *
 * @returns {Object} - Object containing color to set menu item
 *
 */
const isActive = (history, path) => {
  if (history.location.pathname == path) return { fontWeight: "bold" };
  else return { fontWeight: "normal" };
};

/**
 * Menu that varies based on user type and whether they are logged in
 */
const Menu = withRouter(function ({ history }) {
  return (
    <div>
      <Link to="/">
        <h6 aria-label="Home">CONSAMS</h6>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/register">
            <button className="lol" style={isActive(history, "/register")}>
              Register
            </button>
          </Link>

          <Link to="/login">
            <button style={isActive(history, "/login")}>Login</button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              <img
                src={"/api/users/photo/" + auth.isAuthenticated().user._id}
              />
            </button>
          </Link>
          {}

          <button
            onClick={() => {
              auth.clearJWT(() => history.push("/"));
            }}
          >
            Log Out
          </button>
        </span>
      )}
    </div>
  );
});

export default Menu;
