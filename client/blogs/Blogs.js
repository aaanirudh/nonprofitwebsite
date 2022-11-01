import React, { useState, useEffect } from "react";
import auth from "./../auth/auth-helper";
import Post from "./Post";

import { makeStyles } from "@material-ui/core/styles";
import { listBlogFeed } from "./api-blog";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
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
    <div style={{ marginTop: "24px" }}>
      {posts.map((item, i) => {
        return <Post blog={item} key={i} onRemove={removePost} />;
      })}
    </div>
  );
}
