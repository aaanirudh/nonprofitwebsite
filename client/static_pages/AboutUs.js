import React from 'react';
import { Link, withRouter } from "react-router-dom";

import babyImage from '../assets/images/baby1.png';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  aboutus_container : {
    display : 'flex',
    flexDirection : 'column'
  },
  top_photo : {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${babyImage})`,
    opacity : 0.8,
  },
  aboutus_content : {
    paddingLeft : '200px',
    paddingRight : '200px',
    paddingTop : '40px',
    paddingBottom : '100px',
    boxShadow : "0px -5px 10px grey"
  }
})

const AboutUs = withRouter(function () {
  const classes = useStyles();

  return (
    <div className={classes.aboutus_container}>
      <div className={classes.top_photo} style={{ height : '300px'}} />
      <div style={{ marginTop : '30px', backgroundColor : 'white' }}>
        <div className={classes.aboutus_content}>
          <Typography variant="h3" style={{ paddingBottom : '50px'}}>
            <strong>About CONSAMS</strong>
          </Typography>

          <Typography variant="h5" style={{ marginBottom : '30px'}}>
            <strong>
            Founded 2011 : Five Southern African Medical schools;
            <br/>
            Expanded 2015 & 2022 : Include Sub-Sahara African Medical Schools.
            </strong>
          </Typography>

          <Typography variant="h6">
            
            CONSAMS - The “Consortium of New Sub-Sahara African Medical Schools” 
            - was founded in 2011 under the original name of the “Consortium of 
            New Southern African Medical Schools.” At an ensuing Annual General 
            Meeting, it was decided to expand the organization to include members 
            across the African continent and beyond southern Africa - hence the name 
            change from “Southern African” to Sub-Sahara African.
            
          </Typography>
        </div>
      </div>
    </div>
  )
});

export default AboutUs