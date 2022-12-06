import React from "react";
import doctorImage from "./../assets/images/taleni.png";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaypal } from "@fortawesome/free-brands-svg-icons";
import { Paper } from "@material-ui/core";

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

    backgroundImage: `url(${doctorImage})`,
    padding: theme.spacing(18, 0, 12),
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
    color: "black",
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
  },
}));
/**
 * Default home view when not logged in
 */
export default function HomeView() {
  const classes = useStyles();

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
          <Typography component="h1" variant="h2" gutterBottom>
            <strong>
              Consortium of New Sub-Sahara African Medical Schools
            </strong>
          </Typography>

          <Typography variant="h5" paragraph>
            <strong>Serving new medical and health professionals' schools in the
            Sub-Saharan Community.</strong>
          </Typography>

          <Grid item>
            {/* <Link> */}
            <Button className={classes.payPalButton} variant="contained">
              <FontAwesomeIcon icon={faPaypal} style={{ marginRight: "5px" }} />
              <strong>{"Donate with PayPal"}</strong>
            </Button>
            {/* </Link> */}
          </Grid>
        </Container>
      </div>

      <Container className={classes.cardGrid} maxWidth="lg">
        <Typography variant="h4" className={classes.featuredNewsTitle}>
          <strong>Featured News</strong>
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper>
              <Typography className={classes.featuresTitle} variant="h4">
                Who We Are
              </Typography>

              <Typography component="h3">
              <strong>To promote competency-based and other undergraduate and postgraduate curricula, appropriate to the needs and context of each participating country.  </strong>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper>
              <Typography className={classes.featuresTitle} variant="h4">
                Our Goals:
              </Typography>

              <Typography component="h3">
              <strong>1. To promote faculty and trainee idea exchanges between the participating medical schools and other healthcare networks.</strong>
              <br></br> <br></br>
              <strong>2. To promote south-south and north-south partnerships.</strong>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper>
              <Typography className={classes.featuresTitle} variant="h4">
                Get Involved
              </Typography>

              <Typography component="h3">
              <strong> Sign up as a student or organization and better manage your students' courseload. Joinour mailing list to receive updates about our work and events, or reach out if you would like to explore partnerships or invite us to speak at your event or campus.</strong>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}