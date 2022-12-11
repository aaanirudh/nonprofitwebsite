import React from "react";
import { Link, withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Add from "@material-ui/icons/Add";

import "./Footer.css";

const useStyles = makeStyles((theme) => ({
  footer_container: {
    paddingTop: "30px",
    backgroundColor: "#97B6E4",
    display: "flex",
    // position: "fixed",
    // bottom: "0",
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "17.4rem",
    flexDirection: "column",
  },
  copyright: {
    backgroundColor: "#3f4771",
    color: "#FFFFFF",
    borderTopColor: "black",
    borderTopStyle: "solid",
    borderTopWidth: "4px",
  },
  info_container: {
    marginLeft: "170px",
    marginRight: "150px",
    marginBottom: "20px",
    display: "flex",
  },
  about_us: {
    flex: "1",
    marginLeft: "20px",
    marginRight: "20px",
  },
  memberships: {
    flex: "1",
    marginLeft: "20px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
  },
  contact_us: {
    flex: "1",
    marginLeft: "20px",
    marginRight: "20px",
  },
}));

const Footer = withRouter(function ({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.footer_container}>
      <div className={classes.info_container}>
        <div className={classes.about_us}>
          <Typography variant="h6" style={{ color: "white" }}>
            About Us
          </Typography>
          <Divider style={{ marginTop: "5px", marginBottom: "20px" }} />

          <Typography
            variant="body2"
            style={{ color: "black", marginTop: "10px" }}
          >
            CONSAMS - The “Consortium of New Sub-Sahara African Medical Schools”
            - was founded in 2011 under the original name of the “Consortium of
            New Southern African Medical Schools.” At an ensuing Annual General
            Meeting, it was decided to expand the organization to include
            members across the African continent and beyond southern - hence the
            name change from “Southern African” to Sub-Sahara African.
          </Typography>
        </div>

        <div className={classes.memberships}>
          <Typography variant="h6" style={{ color: "white" }}>
            Memberships
          </Typography>
          <Divider style={{ marginTop: "5px", marginBottom: "20px" }} />

          <Link style={{ flex: "1" }}>
            <ArrowForwardIosIcon />
            <Typography variant="button">About Memberships</Typography>
          </Link>
          <br />
          <Link style={{ flex: "1" }}>
            <ArrowForwardIosIcon />
            <Typography variant="button">Membership Fees</Typography>
          </Link>
          <br />
          <Link style={{ flex: "1" }}>
            <ArrowForwardIosIcon />
            <Typography variant="button">Benefits</Typography>
          </Link>
        </div>

        <div className={classes.contact_us}>
          <Typography variant="h6" style={{ color: "white" }}>
            Contact Us
          </Typography>
          <Divider style={{ marginTop: "5px", marginBottom: "20px" }} />

          <Typography style={{ marginBottom: "5px" }}>
            <strong>Phone :</strong>
            <br />
            Mobile : +1 (202)-555-0110
            <br />
            Office : +1 (651)-555-0142
          </Typography>

          <br />

          <Typography>
            <strong>Email :</strong>
            <br />
            consams@consams.net
          </Typography>
        </div>
      </div>

      <div className={classes.copyright}>
        <Typography variant="caption" style={{ marginLeft: "30px" }}>
          © 2022 CONSAMS. All Rights Reserved.
        </Typography>
      </div>
    </div>
  );
});

export default Footer;
