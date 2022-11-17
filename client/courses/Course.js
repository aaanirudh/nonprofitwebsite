import React, { useState } from "react";
import auth from "../auth/auth-helper";
import Comments from "./Comments";
import moment from "moment";
import { like, unlike, remove } from "./api-courses";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: "auto",
    marginBottom: theme.spacing(3),
  },
  cardContent: {
    backgroundColor: "white",
    padding: theme.spacing(0),
  },
  cardHeader: {
    backgroundColor: "white",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
  },
  subtitle: {
    margin: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  likeButton: {
    marginLeft: theme.spacing(0.5),
  },
  subtext: {
    margin: theme.spacing(0.5),
    marginLeft: theme.spacing(1.5),
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
  text: {
    marginLeft: theme.spacing(1.5),
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
    margin: theme.spacing(0.5),
    marginTop: 0,
  },
}));

export default function Course(props) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();

  const [values, setValues] = useState({
    comments: props.course.comments,
    liked: props.course.likes.some((val) => val._id == jwt.user._id),
    numLikes: props.course.likes.length,
    open: false,
    confirmOpen: false,
  });

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments });
  };

  const deleteCourse = () => {
    remove(
      {
        postId: props.course._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        props.onRemove(props.course);
      }
    });
    handleConfirmClose();
  };

  //open confirm window
  const confirmDelete = () => {
    setValues({ ...values, confirmOpen: true });
  };

  //close ensemble chat
  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  //close confirm window
  const handleConfirmClose = () => {
    setValues({ ...values, confirmOpen: false });
  };

  //helper function to likeclickaction
  const likeClick = () => {
    return likeClickAction(like);
  };

  //helper function to likeclickaction
  const unlikeClick = () => {
    return likeClickAction(unlike);
  };

  //like or unlike post at api-post
  const likeClickAction = (likeAction) => {
    likeAction(
      {
        postId: props.course._id,
      },
      {
        t: jwt.token,
      }
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues((prev) => {
          return {
            ...prev,
            liked: !prev.liked,
            numLikes: prev.liked ? prev.numLikes - 1 : prev.numLikes + 1,
          };
        });
      }
    });
  };

  return (
    <span>
      <Card className={classes.card}>
        <CardHeader
          action={
            props.course.postedBy._id === jwt.user._id && (
              <IconButton onClick={confirmDelete}>
                <DeleteIcon />
              </IconButton>
            )
          }
          title={<Typography variant="h4">{props.course.title}</Typography>}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Grid
            container
            spacing={8}
            alignItems="center"
            className={classes.subtitle}
          >
            <Typography className={classes.subtitleVals} component="p">
              by
            </Typography>
            <Avatar
              className={classes.subtitleVals}
              src={"/api/users/photo/" + props.course.postedBy._id}
            />
            <Link
              style={{ textDecoration: "none" }}
              className={classes.subtitleVals}
              to={"/user/" + props.course.postedBy._id}
            >
              {props.course.postedBy.name}
            </Link>
          </Grid>
          <iframe
            width="700"
            height="400"
            src={props.course.link}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
          <Typography component="p" className={classes.text}>
            {props.course.description}
          </Typography>
          <Typography component="p" className={classes.subtext}>
            {"Posted: " +
              moment(props.course.created).format("ddd, MMM Do YYYY, h:mm A z")}
          </Typography>
          {values.liked ? (
            <Button
              className={classes.likeButton}
              onClick={unlikeClick}
              variant="text"
              color="secondary"
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ marginRight: "5px" }}
              />
              {`${values.numLikes} like${values.numLikes !== 1 ? "s" : ""}`}
            </Button>
          ) : (
            <Button
              className={classes.likeButton}
              onClick={likeClick}
              variant="text"
              color="primary"
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                style={{ marginRight: "5px" }}
              />
              {`${values.numLikes} like${values.numLikes !== 1 ? "s" : ""}`}
            </Button>
          )}
          <Divider />
          <Comments
            postId={props.course._id}
            postedbyId={props.course.postedBy._id}
            comments={values.comments}
            updateComments={updateComments}
          />
        </CardContent>
      </Card>

      <Dialog open={values.confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Delete Course?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {"You will not be able to undo this action"}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus="autoFocus"
            color="primary"
            onClick={handleConfirmClose}
          >
            Cancel
          </Button>

          <Button color="secondary" onClick={deleteCourse}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
