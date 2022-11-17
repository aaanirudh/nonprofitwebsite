import React, { useState } from "react";
import auth from "../auth/auth-helper";
import { create } from "./api-courses.js";
import { Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  cardContent: {
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: "90%",
  },
  submit: {
    margin: theme.spacing(2),
    margin: "auto",
  },
  error: {
    verticalAlign: "middle",
  },
}));

export default function NewCourse() {
  const classes = useStyles();

  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState({
    title: "",
    link: "",
    description: "",
    error: "",
    redirectToReferrer: false,
  });

  const [open, setOpen] = useState(false);

  //open confirm window
  const openConfirm = () => {
    setOpen(true);
  };

  //close confirm window
  const closeConfirm = () => {
    setOpen(false);
  };

  //submit post to api-post to create
  const clickPost = () => {
    setValues({ ...values, error: "Link is required." });
    if (!values.link) {
      return;
    }
    if (!values.link.includes("/embed/")) {
      setValues({ ...values, error: "Link must be a valid embed link." });
      return;
    }
    const postData = {
      title: values.title || undefined,
      link: values.link || undefined,
      description: values.description || undefined,
    };
    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      postData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirectToReferrer: true });
      }
    });
  };

  //handle change in input
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { redirectToReferrer } = values;

  //redirect to home with values
  if (redirectToReferrer) {
    return <Redirect to={{ pathname: "/courses" }} />;
  }

  return (
    <span>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} />
        <CardContent className={classes.cardContent}>
          <TextField
            placeholder="Title..."
            multiline
            rows="1"
            value={values.title}
            onChange={handleChange("title")}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            placeholder="Youtube Link"
            multiline
            rows="1"
            value={values.link}
            onChange={handleChange("link")}
            className={classes.textField}
            margin="normal"
          />

          <TextField
            placeholder="Description..."
            multiline
            rows="4"
            value={values.description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />

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
            disabled={values.text === ""}
            onClick={openConfirm}
            className={classes.submit}
          >
            POST
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} disableBackdropClick={true} onClose={closeConfirm}>
        <DialogTitle>Make Posting?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            You will not be able make any changes (for now).
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button autoFocus="autoFocus" onClick={closeConfirm} color="primary">
            Cancel
          </Button>

          <Button onClick={clickPost} color="secondary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
