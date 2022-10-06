import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";

/**
 * MainRouter (parent: App)
 * @returns {Object} - Combines menu, page content based on route, and footer
 */
const MainRouter = () => {
  return (
    <div>
      <Menu />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </div>
  );
};

export default MainRouter;
