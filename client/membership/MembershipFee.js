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

const MembershipFee = withRouter(function () {
  const classes = useStyles();

  return (
    <>
      <div className={classes.memberships_container}>
        <div
          className={classes.top_photo}
          style={{ height: "300px", zIndex: -1 }}
        />
        <div style={{ backgroundColor: "beige" }}>
          <div className={classes.memberships_content}>
            <Typography backgr variant="h3" style={{ paddingBottom: "15px" }}>
              <strong>STUDENT MEMBERSHIP</strong>
            </Typography>

            <Divider style={{ marginBottom: "15px" }} />

            <Typography variant="h5" style={{ marginBottom: "20px" }}>
              <strong>
                Student Membership: A Student membership to CONSAMS grants you
                access to exclusive lectures, posts, and blogs by course
                instructors. Just a few of the features included in a user
                membership include the ability to make posts, blogs, and pose
                direct questions to instructors.
              </strong>
            </Typography>

            <Typography variant="h6" style={{ marginBottom: "30px" }}>
              <strong>
                <br />
                Fees :
              </strong>
              A Student membership costs $50/year and is automatically renewed
              one year after initial payment. This payment will take place via
              PayPal, so you must have an authorized PayPal account to become a
              premium member.
            </Typography>
            <Typography variant="h6">
              <strong>Benefits :</strong>
              Along with supporting our cause, some of the benefits of a
              membership include being able to make blog posts, view special
              lectures, and access and interact with exclusive content. This
              content is all educational in nature, with the aim of a membership
              being to allow users to more adequately sanctify their educational
              understanding of in-class material. Thank you for considering
              buying a membership to CONSAMS! Your membership fee goes a
              tremendous way in terms of helping our organization spread medical
              knowledge and aid students and teachers across Africa!
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.memberships_container}>
        <div
          className={classes.top_photo}
          style={{ height: "300px", zIndex: -1 }}
        />
        <div style={{ backgroundColor: "light-purple" }}>
          <div className={classes.memberships_content}>
            <Typography backgr variant="h3" style={{ paddingBottom: "15px" }}>
              <strong>Faculty Membership:</strong>
            </Typography>

            <Divider style={{ marginBottom: "15px" }} />

            <Typography variant="h5" style={{ marginBottom: "30px" }}>
              <strong>
                Faculty Membership: A Faculty membership to CONSAMS grants a
                professor/instructor the unique ability to make exclusive blog
                posts, lectures, and educational content for their students.
                Other key features a faculty membership includes is the ability
                to make videos and post them for students to see. This is a
                useful feature for teachers who are involved in a multitude of
                courses. Lastly, purchasing a paid faculty membership comes with
                the ability to create as many courses as necessary, adding as
                many students as desired.
              </strong>
            </Typography>

            <Typography variant="h6">
              A free faculty membership comes with the ability to make up to
              five courses, and add up to twenty students per course. This type
              of membership also comes with the ability to make blog posts, but
              not videos. This membership does not grant a faculty member the
              ability to make exclusive blog posts, lectures, and educational
              content for their students.
            </Typography>

            <Typography variant="h6" style={{ marginBottom: "30px" }}>
              <strong>
                <br></br>
                Fees :
              </strong>
              The fees of a faculty membership is $100/year, which is
              automatically renewed one year after initial payment. This payment
              will take place via PayPal, so you must have an authorized PayPal
              account to become a premium member.
            </Typography>
            <Typography variant="h6" style={{ marginBottom: "30px" }}>
              <strong>Benefits :</strong>
              Along with supporting our cause, some of the benefits of a faculty
              membership include being able to interact with special blog posts
              from within one's organization. This content is all educational in
              nature, with the aim of a membership being to allow faculty
              members to more adequately sanctify their students' educational
              understanding of in-class material. Thank you for considering
              buying a membership to CONSAMS! Your membership fee goes a
              tremendous way in terms of helping our organization spread medical
              knowledge and aid students and teachers across Africa!
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
});

export default MembershipFee;
