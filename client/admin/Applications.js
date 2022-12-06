import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
// import Post from "./Post";
import { Button, Card, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { getApplications, approve, deny } from "./api-admin";
import Application from "./Application";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  createButton: {
    margin: theme.spacing(2),
  },
}));

export default function Applications() {
  const classes = useStyles();

  const [apps, setApps] = useState([]);

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getApplications(
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setApps(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  //remove post from postings
  const removePost = (app) => {
    const updatedApps = [...apps];
    const index = updatedApps.indexOf(app);
    updatedApps.splice(index, 1);
    setApps(updatedApps);
  };
  const approveApp = (app) => {
    approve(
      {
        id: app._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        removePost(app);
      }
    });
  };

  const denyApp = (app) => {
    deny(
      {
        id: app._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        removePost(app);
      }
    });
  };

  return (
    <Grid container justify="center" spacing={8}>
      <Grid item>
        {apps.map((item, i) => {
          return (
            <Application
              app={item}
              key={i}
              onApprove={approveApp}
              onDeny={denyApp}
            />
          );
        })}
      </Grid>
    </Grid>
  );
}
