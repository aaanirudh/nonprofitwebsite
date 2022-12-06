import React from "react";
import { withRouter } from "react-router-dom";

import background300 from "../assets/images/background-300px.png";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  memberships_container: {
    display: "flex",
    flexDirection: "column",
  },
  top_photo: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${background300})`,
    opacity: 0.8,
  },
  memberships_content: {
    paddingLeft: "200px",
    paddingRight: "200px",
    paddingTop: "60px",
    paddingBottom: "60px",
    boxShadow: "0px -5px 10px grey",
  },
});

const Memberships = withRouter(function () {
  const classes = useStyles();

  return (
    <div className={classes.memberships_container}>
      <div
        className={classes.top_photo}
        style={{ height: "300px", zIndex: -1 }}
      />
      <div style={{ backgroundColor: "beige" }}>
        <div className={classes.memberships_content}>
          <Typography backgr variant="h3" style={{ paddingBottom: "15px" }}>
            <strong>USER MEMBERSHIP</strong>
          </Typography>

          <Divider style={{ marginBottom: "15px" }} />

          <Typography variant="h5" style={{ marginBottom: "30px" }}>
            <strong>
              A membership to CONSAMS grants you access to exclusive lectures,
              posts, and blogs by course instructors and medical organizations.
              Just a few of the features included in a user membership include
              the ability to make posts, blogs, and pose direct questions to
              instructors.
            </strong>
          </Typography>

          <Typography variant="h6">
            Basic free users do not have access to view specific posts,
            lectures, and blogs that are tagged as members only. Basic free
            users will be able to sign up at the register page, after which they
            can acquire a membership by navigating to the home page. Once a user
            has paid for a membership, their account privileges are
            automatically upgraded so that these new posts and lectures can be
            viewed. For more information about the fees, please visit the
            <strong> Membership Fees</strong> page.
          </Typography>

          <br />

          <Typography variant="h6" style={{ marginBottom: "30px" }}>
            Along with supporting our cause, some of the benefits of a
            membership include being able to make blog posts, view special
            lectures, and access and interact with exclusive content. This
            content is all educational in nature, with the aim of a membership
            being to allow users to more adequately sanctify their educational
            understanding of in-class material. Thank you for considering buying
            a membership to CONSAMS! Your membership fee goes a tremendous way
            in helping our organization spread medical knowledge and aid
            students and teachers across Africa!
          </Typography>
        </div>
      </div>
    </div>
  );
});

export default Memberships;
