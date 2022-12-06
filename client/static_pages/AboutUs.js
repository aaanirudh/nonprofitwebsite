import React from 'react';
import { Link, withRouter } from "react-router-dom";

import babyImage from '../assets/images/baby1.png';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  aboutus_container : {
    display : 'flex',
    flexDirection : 'column'
  },
  top_photo : {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${babyImage})`,
    opacity : 0.8
  }

})

const AboutUs = withRouter(function () {
  const classes = useStyles();


  return (
    <div className={classes.aboutus_container}>
      <div className={classes.top_photo} style={{ height : '300px'}} />
      
    </div>
  )
});

export default AboutUs