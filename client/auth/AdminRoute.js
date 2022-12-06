import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth-helper";

/**
 * Determines whether user is authenticated and redirects them to log in if not
 */
const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated()?.user?.admin ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminRoute;
