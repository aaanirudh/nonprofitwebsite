import React, { useState } from "react";
import { create } from "./api-user.js";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  registerType: {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    width: "180px;",
    "&$selected": {
      color: "white",
      "&:hover": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

/**
 * Register (parent: MainRouter)
 * @returns {Object} - Register page
 */
export default function Register() {
  let loc = useLocation();
  const classes = useStyles();

  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    open: false,
    error: "",
    organization: loc.state == null ? false : loc.state,
  });

  //handle change to update input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //submit user to api-user when registering
  const clickSubmit = () => {
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      organization: values.organization,
    };

    create(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  //change user type between user and organization
  const changeUser = (event, nextView) => {
    setValues({ ...values, organization: event.target.value === "true" });
  };

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Register
          </Typography>
          <ToggleButtonGroup
            value={"" + values.organization}
            color="primary"
            exclusive
            onChange={changeUser}
            aria-label="large outlined primary button group"
          >
            <ToggleButton className={classes.registerType} value="false">
              Student
            </ToggleButton>
            <ToggleButton className={classes.registerType} value="true">
              Organization
            </ToggleButton>
          </ToggleButtonGroup>
          <div>
            <TextField
              id="name"
              label="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
          </div>
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              {/* <Icon color="error" className={classes.error}>
                error
              </Icon> */}
              {values.error}
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
        </CardActions>
      </Card>

      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {values.organization ? "Organization created." : "User created."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link style={{ textDecoration: "none" }} to="/login">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Log In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
