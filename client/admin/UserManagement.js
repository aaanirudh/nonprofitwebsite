import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { getUsers, deleteUser } from "./api-admin";
import UserItem from "./UserItem";

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

export default function UserManagement() {
  const classes = useStyles();

  const [apps, setApps] = useState([]);

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    getUsers(
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      console.log(data);
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
    deleteUser(
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
          return <UserItem app={item} key={i} onApprove={approveApp} />;
        })}
      </Grid>
    </Grid>
  );
}
