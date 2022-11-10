import React from "react";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CONSAMSLogo from "./../assets/images/logo.svg";
import MenuDropdown from "./MenuDropdown";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    spacing: 4,
  },
  menu: {
    margin: theme.spacing(1),
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
  },
  customizeToolbar: {
    minHeight: 100,
  },
  smallAvatar: {
    width: 25,
    height: 25,
  },
  menuButton: {
    backgroundColor: "#97B6E4",
    textTransform: "none",
    margin: "0 5px",
  },
}));

/**
 * Change color of menu item when selected
 * @param  {Object} history - history from router
 * @param  {Object} path - intended path for link
 *
 * @returns {Object} - Object containing color to set menu item
 *
 */
const isActive = (history, path) => {
  // if (history.location.pathname == path) return { color: "#ff4081" };
  // else return { color: "#ffffff" };
};

/**
 * Menu that varies based on user type and whether they are logged in
 */
const Menu = withRouter(function ({ history }) {
  const classes = useStyles();

  return (
    <AppBar color="light" position="static">
      <Toolbar color="light" className={classes.customizeToolbar}>
        <Link className={classes.title} to="/">
          <img src={CONSAMSLogo} alt="logo" width="150px" />
        </Link>
        <MenuDropdown
          title="About Us"
          options={["About CONSAMS", "Our History", "Leadership"]}
        />
        <MenuDropdown title="Partners" />
        <MenuDropdown
          title="Memberships"
          options={["About Memberships", "Membership Fees", "Benefits"]}
        />
        <MenuDropdown
          title="Media"
          options={["News", "Photo Gallery", "Newsletter"]}
        />
        <MenuDropdown
          title="Resources"
          options={[
            "Courses",
            "Blogs",
            "Publications",
            "Books",
            "Podcasts",
            "Videos/Films",
          ]}
        />

        {!auth.isAuthenticated() ? (
          <span>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Button variant="contained" className={classes.menuButton}>
                Log In
              </Button>
            </Link>
            <Link style={{ textDecoration: "none" }} to="/register">
              <Button className={classes.menuButton} variant="contained">
                Register
              </Button>
            </Link>
          </span>
        ) : (
          <span>
            <Link
              style={{ textDecoration: "none" }}
              to={"/user/" + auth.isAuthenticated().user._id}
            >
              <Button
                className={classes.menu}
                style={isActive(
                  history,
                  "/user/" + auth.isAuthenticated().user._id
                )}
              >
                <Avatar
                  className={classes.smallAvatar}
                  src={"/api/users/photo/" + auth.isAuthenticated().user._id}
                />
              </Button>
            </Link>
            {}

            <Button
              className={classes.menuButton}
              variant="contained"
              onClick={() => {
                auth.clearJWT(() => history.push("/"));
              }}
            >
              Log Out
            </Button>
          </span>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Menu;
