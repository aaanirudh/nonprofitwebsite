import React, { useState, useEffect } from "react";
import auth from "../auth/auth-helper";
import Course from "./Course";
import { Button, Card, Grid, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { listCourseFeed } from "./api-courses";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  createButton: {
    margin: theme.spacing(2),
  },
}));

export default function Courses() {
  const classes = useStyles();

  const [courses, setCourses] = useState([]);

  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listCourseFeed(
      {
        t: jwt.token,
      },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCourses(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  //remove post from postings
  const removeCourse = (post) => {
    const updatedCourses = [...courses];
    const index = updatedCourses.indexOf(post);
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
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
              to="/createcourse"
            >
              Create Course
            </Link>
          </Button>
        </Grid>
      )}

      <Grid item>
        {courses.map((item, i) => {
          return <Course course={item} key={i} onRemove={removeCourse} />;
        })}
      </Grid>
    </Grid>
  );
}
