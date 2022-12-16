import React, { useState } from "react";
import background489 from "./../assets/images/background-489px.png";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { Box, List, ListItem, ListItemText, Paper } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DialogContent from "@material-ui/core/DialogContent";
import { subscribe } from "./api-home.js";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: "#111111",
  },
  heroContent: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",

    backgroundImage: `url(${background489})`,
    backgroundColor: "rgba(0, 0, 0, 1.2)",
    padding: theme.spacing(25, 0, 20),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign: "center",
    color: "#3f4771",
  },
  titleImage: {
    textAlign: "center",
    // color: "black",
    color: "white",
  },
  featuredNewsTitle: {
    color: "black",
    paddingBottom: theme.spacing(4),
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
/**
 * Default home view when not logged in
 */
export default function HomeView() {
  const classes = useStyles();
  const [pay, setPay] = useState(false);
  const jwt = auth.isAuthenticated();

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
    <main>
      <div className={classes.heroContent}>
        <Container
          className={classes.titleImage}
          direction="column"
          alignitems="center"
          justifycontent="center"
          maxWidth="lg"
        >
          <Typography
            component="h1"
            variant="h2"
            gutterBottom
            className={classes.title_shadow}
          >
            <strong>
              Consortium of New Sub-Sahara African Medical Schools
            </strong>
          </Typography>

          <Typography
            variant="h5"
            paragraph
            className={classes.subtitle_shadow}
          >
            <i style={{ color: "white" }}>
              New African Medical Schools Learning{" "}
              <span style={{ color: "#16306d" }}>
                <strong>Together</strong>
              </span>
            </i>
          </Typography>

          <Grid item>
            <Button
              className={classes.payPalButton}
              variant="contained"
              onClick={() => setPay(true)}
            >
              <FontAwesomeIcon icon={faPaypal} style={{ marginRight: "5px" }} />
              <strong>{"Donate with PayPal"}</strong>
            </Button>
          </Grid>
        </Container>
      </div>
      <Box p={8} style={{ backgroundColor: "#6694d7" }}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography variant="h4" style={{ color: "#16306d" }}>
            <strong>Goals & Objectives</strong>
          </Typography>
          <Grid container style={{ color: "white" }}>
            <Grid item xs={6}>
              <List component="ol">
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>001.</strong> To
                        promote competency-based and other undergraduate and
                        postgraduate curricula, appropriate to the needs and
                        context of each participating country.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>002.</strong> To
                        promote faculty and trainee idea exchanges between the
                        participating medical schools and other healthcare
                        networks.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>003.</strong> To
                        promote south-south and north-south partnerships.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List component="ol">
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>004.</strong> To
                        promote needs-based/translational-relevant research.
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>005.</strong> To
                        benchmark and support one another’s progress
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography type="h6" style={{ fontSize: "1.5rem" }}>
                        <strong style={{ color: "#16306d" }}>006.</strong> To
                        advocate for improvement in governance and health care
                        in Africa.
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box p={8} style={{ backgroundColor: "white" }}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Typography variant="h4" className={classes.featuredNewsTitle}>
            <strong>Affiliated Organizations</strong>
          </Typography>
          <Grid container spacing={5}>
            <Grid item xs={4}>
              <a
                href="https://www.aasciences.africa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo2.png"
                  alt="Logo 1"
                  style={{ backgroundColor: "black", padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://www.cugh.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo23-1.png"
                  alt="Logo 2"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a
                href="https://www.faimer.org/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo234-1.png"
                  alt="Logo 3"
                  style={{ padding: "20px" }}
                />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a
                href="https://www.vumc.org/global-health/welcome"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo2346.png"
                  alt="Logo 3"
                />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a
                href="https://www.afrehealth.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo2345.png"
                  alt="Logo 3"
                />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a
                href="https://thenetworktufh.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo23467.png"
                  alt="Logo 3"
                />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a
                href="https://www.fic.nih.gov/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://consams.org/wp-content/uploads/2022/05/Logo234678.png"
                  alt="Logo 3"
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
    </main>
  );
}
