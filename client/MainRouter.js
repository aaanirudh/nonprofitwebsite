import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Register from "./user/Register";
import Login from "./auth/Login";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import Footer from "./core/Footer";
import AboutUs from "./static_pages/AboutUs";
import Leadership from "./static_pages/Leadership";
import Memberships from "./membership/Memberships";
import MembershipFee from "./membership/MembershipFee";
import Blogs from "./blogs/Blogs";
import NewBlog from "./blogs/NewBlog";
import Courses from "./courses/Courses";
import NewCourse from "./courses/NewCourse";
import AdminRoute from "./auth/AdminRoute";
import Applications from "./admin/Applications";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
  },

  contentWrap: {
    paddingBottom: "2.5rem" /* Footer height */,
  },

  footer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "2.5rem" /* Footer height */,
  },
}));
/**
 * MainRouter (parent: App)
 * @returns {Object} - Combines menu, page content based on route, and footer
 */
const MainRouter = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrap}>
        <Menu />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
          <Route path="/user/:userId" component={Profile} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/leadership" component={Leadership} />
          <Route path="/memberships" component={Memberships} />
          <Route path="/membershipfee" component={MembershipFee} />
          <PrivateRoute path="/blogs" component={Blogs} />
          <PrivateRoute path="/courses" component={Courses} />
          <PrivateRoute path="/createblog" component={NewBlog} />
          <PrivateRoute path="/createcourse" component={NewCourse} />
          <AdminRoute path="/applications" component={Applications} />
        </Switch>

        <Footer className={classes.footer} />
      </div>
    </div>
  );
};

export default MainRouter;
