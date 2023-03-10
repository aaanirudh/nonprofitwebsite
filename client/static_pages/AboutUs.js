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
    paddingBottom: "100px",
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

const AboutUs = withRouter(function () {
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
            <strong>About CONSAMS</strong>
          </Typography>

          <Divider />

          <Typography
            variant="h5"
            style={{ marginTop: "20px", marginBottom: "30px" }}
          >
            <strong>
              Founded 2011 : Five Southern African Medical schools;
              <br />
              Expanded 2015 & 2022 : Include Sub-Sahara African Medical Schools.
            </strong>
          </Typography>

          <Typography variant="h6">
            CONSAMS - The ???Consortium of New Sub-Sahara African Medical Schools???
            - was founded in 2011 under the original name of the ???Consortium of
            New Southern African Medical Schools.??? At an ensuing Annual General
            Meeting, it was decided to expand the organization to include
            members across the African continent and beyond southern Africa -
            hence the name change from ???Southern African??? to Sub-Sahara African.
          </Typography>

          <br />

          <Typography variant="h6">
            Today CONSAMS is rapidly expanding across Africa to include new
            medical schools that are within about 10-15 years of graduating
            their first class of medical students.
          </Typography>
        </div>
      </div>
      <Box
        p={8}
        style={{ backgroundColor: "white" }}
        className={classes.aboutus_content}
      >
        <Typography variant="h3" style={{ marginBottom: "15px" }}>
          <strong>The Founding Members of CONSAMS</strong>
        </Typography>
        <Divider />
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <a
                href="https://www.cbu.ac.zm/schoolsAndUnits/schoolofmedicine/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={copperbelt}
                  alt="Logo 1"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://www.nul.ls/health/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={lesotho}
                  alt="Logo 2"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://www.utu.fi/en/university/faculty-of-medicine/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={turku}
                  alt="Logo 3"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://www.unam.edu.na/faculty-of-health-sciences#SoM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={unam}
                  alt="Logo 3"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://cidma.eu/lurio-university/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={unidelurio}
                  alt="Logo 3"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://medschool.vanderbilt.edu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  width="250px"
                  src={vusm}
                  alt="Logo 3"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
          </Grid>
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

export default AboutUs;
