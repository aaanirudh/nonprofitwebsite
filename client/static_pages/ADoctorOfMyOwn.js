import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import background300 from "../assets/images/background-300px.png";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Container, Typography, Divider } from "@material-ui/core";
import copperbelt from "../assets/founding_members/copperbelt.png";
import lesotho from "../assets/founding_members/lesotho.png";
import turku from "../assets/founding_members/turku.png";
import unam from "../assets/founding_members/unam.png";
import unidelurio from "../assets/founding_members/unidelurio.png";
import vusm from "../assets/founding_members/vusm.png";
import Dialog from "@material-ui/core/Dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DialogContent from "@material-ui/core/DialogContent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { subscribe } from "../homeviews/api-home.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  aboutus_container: {
    display: "flex",
    flexDirection: "column",
  },
  top_photo: {
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${background300})`,
    opacity: 0.8,
  },
  aboutus_content: {
    paddingLeft: "200px",
    paddingRight: "200px",
    paddingTop: "60px",
    // paddingBottom: "100px",
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: "center",
    color: "#3f4771",
  },
  featuresTitle: {
    margin: theme.spacing(2, 0),
    backgroundColor: "#CBC3E3",
  },
  payPalButton: {
    textTransform: "none",
    backgroundColor: "#ffcc00",
    fontSize: "1.1rem",
  },
}));

const ADoctorOfMyOwn = withRouter(function () {
  const classes = useStyles();
  const [pay, setPay] = useState(false);
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "CONSAMS Donation",
            amount: {
              currency_code: "USD",
              value: 10,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      if (jwt) {
        subscribe({
          t: jwt.token,
        }).then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setPay(false);
          }
        });
      } else {
        setPay(false);
      }
    });
  };

  return (
    <div className={classes.aboutus_container}>
      <div className={classes.top_photo} style={{ zIndex: -1 }} />
      <div style={{ backgroundColor: "white" }}>
        <div className={classes.aboutus_content}>
          <Typography variant="h3" style={{ marginBottom: "15px" }}>
            <strong>A Doctor of My Own</strong>
          </Typography>

          <Divider />

          <Typography variant="h6" style={{ marginTop: "20px" }}>
            A Doctor of My Own, director by Trisha Pasricha as a Vanderbilt
            University medical study under supervision of her mentor Dr Quentin
            Eichbaum (a native of Namibia), explores the emerging stories of
            students at the newly-opened University of Namibia School of
            Medicine in Windhoek. Fresh out of organic chemistry, the students
            will trek to rural villages, training with patients who have never
            before met a doctor from their own country. The challenges are
            enormous–and so is the pressure. Some students will leave in the
            brain drain, never to return. Yet buried in the sea of endless
            patients and faced with unexpected responsibilities, a few may rise
            to find their calling. And if they do, medical education will
            revolutionize healthcare in Africa.
          </Typography>

          <br />

          <Typography variant="h6">
            The documentary features interviews from key leaders in global
            health and medical education including: Dr. Julio Frenk (former Dean
            of Harvard School of Public Health), Dr. Quentin Eichbaum (Professor
            and Program Director, Vanderbilt University School of Medicine), and
            Dr. Philip Odonkor (former deputy dean, University of Namibia School
            of Medicine). Through interviews of students, allied health workers,
            and leaders in the field, the film captures first-hand accounts of
            the day-to-day battles of healthcare delivery and training new
            physicians in the country.
          </Typography>
        </div>
      </div>
      <Box
        p={8}
        style={{ backgroundColor: "white" }}
        className={classes.aboutus_content}
      >
        <Container className={classes.cardGrid} maxWidth="lg">
          <iframe
            allowfullscreen
            width="1280px"
            height="720px"
            frameborder="0"
            src="https://player.vimeo.com/video/97321059?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1#t="
          ></iframe>
        </Container>
      </Box>
      <Box p={8} style={{ backgroundColor: "#00b39b" }}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Card>
            <CardHeader
              title={
                <Typography variant="h4">Help Support our Cause</Typography>
              }
              subheader={
                <Typography variant="p" style={{ color: "#888888" }}>
                  Support Us and Change the Course of Someone's Life Today!
                </Typography>
              }
            ></CardHeader>
            <CardContent>
              <Button
                className={classes.payPalButton}
                variant="contained"
                onClick={() => setPay(true)}
              >
                <FontAwesomeIcon
                  icon={faPaypal}
                  style={{ marginRight: "5px" }}
                />
                <strong>{"Donate with PayPal"}</strong>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
      <Dialog open={pay} onClose={() => setPay(false)}>
        <PayPalScriptProvider
          options={{
            "client-id":
              "Ab2V1XgqmxuP8istXjyoNNnui5d7Go4jLwPuB_78iUHq6daBvV2tqe-CE6M3_qeblyfO6HOF3AaDHFUn",
          }}
        >
          <DialogContent>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </DialogContent>
        </PayPalScriptProvider>
      </Dialog>
    </div>
  );
});

export default ADoctorOfMyOwn;
