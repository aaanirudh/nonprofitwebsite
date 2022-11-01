import React, {useState, useEffect} from 'react'

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { CallMissedSharp } from '@material-ui/icons';
import { CardContent } from '@material-ui/core';

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
}));

function Blogs() {
  const classes = useStyles();
  
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          this is Blogging


        </CardContent>
      </Card>
    </div>
  )
}

export default Blogs