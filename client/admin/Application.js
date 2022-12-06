import React from "react";
import auth from "./../auth/auth-helper";
import moment from "moment";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: "auto",
    margin: theme.spacing(2),
  },
  cardContent: {
    backgroundColor: "white",
    padding: theme.spacing(1),
    // paddingTop: 0,
  },
  cardHeader: {
    backgroundColor: "white",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  text: {
    margin: theme.spacing(2),
  },
  subtitle: {
    margin: theme.spacing(1),
  },
  likeButton: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  subtext: {
    margin: theme.spacing(2),
    color: "#666666",
    fontSize: "80%",
  },
  photo: {
    textAlign: "center",
    backgroundColor: "#f2f5f4",
    padding: theme.spacing(1),
  },
  media: {
    height: 200,
  },
  button: {
    margin: theme.spacing(1),
    float: "right",
  },
  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
    minWidth: "500px",
  },
  subtitleVals: {
    textDecoration: "none",
    margin: theme.spacing(1),
    marginTop: 0,
  },
}));

export default function Application(props) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  const approve = () => {
    props.onApprove(props.app);
  };
  const deny = () => {
    props.onDeny(props.app);
  };
  return (
    <span>
      <Card className={classes.card}>
        <CardContent>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <b>Name: </b> &nbsp;{props.app.name}
          </Grid>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <b>Organization Name: </b> &nbsp;{props.app.organizationName}
          </Grid>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <b>Type: </b> &nbsp;
            {props.app.organization ? "Organization" : "Student"}
          </Grid>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <b>Email: </b>&nbsp; {props.app.email}
          </Grid>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <b>Applied:&nbsp; </b>
            {moment(props.app.created).format("ddd, MMM Do YYYY, h:mm A z")}
          </Grid>
        </CardContent>

        <CardActions>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <Grid item>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={approve}
              >
                Approve
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                onClick={deny}
              >
                Decline
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </span>
  );
}
