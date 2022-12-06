import React, { useState } from "react";
import { create, getOrganizations } from "./api-user.js";
import { Link, useLocation } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 1000,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    marginBottom : "50px"
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
  registrationType: {
    margin: "auto",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    textTransform: "none",
    width: "500px",
    padding: theme.spacing(2),
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
    cpassword: "",
    error: "",
    organizationName: "",
  });

  const [registerView, setRegisterView] = useState(0);

  //handle change to update input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  //submit user to api-user when registering
  const clickSubmit = () => {
    if (values.password != values.cpassword) {
      setValues({ ...values, error: "Passwords must match" });
      return;
    }
    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
      organizationName: values.organizationName || undefined,
      organization: registerView == 2,
    };

    create(user).then((data) => {
      if (data.error || (data && data.error === "")) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  const changeView = async (value) => {
    setRegisterView(value);
  };

  return (
    <div>
      <Card className={classes.card}>
        {registerView ? (
          <>
            <CardContent>
              <Typography variant="h5" className={classes.title}>
                {registerView == 1 ? "Student" : "Organization"} Registration
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    id="name"
                    label={"Full Name"}
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange("name")}
                    margin="normal"
                  />
                  <br />
                  <TextField
                    id="organizationName"
                    type={registerView == 1 ? "number" : ""}
                    label={
                      registerView == 1
                        ? "6-Digit Organization Code"
                        : "Organization"
                    }
                    className={classes.textField}
                    value={values.organizationName}
                    onChange={handleChange("organizationName")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
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
                  <TextField
                    id="confirmpassword"
                    type="password"
                    label="Confirm Password"
                    className={classes.textField}
                    value={values.cpassword}
                    onChange={handleChange("cpassword")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
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
          </>
        ) : (
          <CardContent>
            <Typography variant="h5" className={classes.title}>
              Registration Type:
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => changeView(1)}
              className={classes.registrationType}
            >
              <Typography variant="h5">Student Memberships</Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => changeView(2)}
              className={classes.registrationType}
            >
              <Typography variant="h5">Institutional Memberships</Typography>
            </Button>
          </CardContent>
        )}
      </Card>

      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {registerView == 2
              ? "Organization created. Please wait for approval."
              : "Student created. Please wait for approval."}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Link style={{ textDecoration: "none" }} to="/">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Return Home
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
