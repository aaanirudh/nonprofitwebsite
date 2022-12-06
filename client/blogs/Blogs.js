import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
import Post from "./Post";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { listBlogFeed } from "./api-blog";

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

export default function Blogs() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listBlogFeed(
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setPosts(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  //remove post from postings
  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  return (
    <Grid container justify="center">
      {auth.isAuthenticated().user.organization && (
        <Grid container justify="center">
          <Button
            className={classes.createButton}
            color="primary"
            variant="contained"
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/createblog"
            >
              Create Blog Post
            </Link>
          </Button>
        </Grid>
      )}

      <Grid item>
        {posts.map((item, i) => {
          return <Post blog={item} key={i} onRemove={removePost} />;
        })}
      </Grid>
    </Grid>
  );
}
