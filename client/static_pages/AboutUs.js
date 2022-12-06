import React from 'react';
import { withRouter } from "react-router-dom";

import background300 from '../assets/images/background-300px.png';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  aboutus_container : {
    display : 'flex',
    flexDirection : 'column'
  },
  top_photo : {
    height : "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${background300})`,
    opacity : 0.8,
  },
  aboutus_content : {
    paddingLeft : '200px',
    paddingRight : '200px',
    paddingTop : '60px',
    paddingBottom : '100px',
    boxShadow : "0px -5px 10px grey"
  }
})

const AboutUs = withRouter(function () {
  const classes = useStyles();

  return (
    <div className={classes.aboutus_container}>
      <div className={classes.top_photo}/>
      <div style={{ backgroundColor : 'white' }}>
        <div className={classes.aboutus_content}>
          <Typography variant="h3" style={{ marginBottom : '15px'}}>
            <strong>About CONSAMS</strong>
          </Typography>

          <Divider/>

          <Typography variant="h5" style={{ marginTop : '20px', marginBottom : '30px'}}>
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

          <br />

          <Typography variant="h6">
            Today CONSAMS is rapidly expanding across Africa to include new medical 
            schools that are within about 10-15 years of graduating their first class 
            of medical students.
          </Typography>

        </div>
      </div>
    </div>
  )
});

export default AboutUs