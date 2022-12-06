import React from 'react';
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import headshot from '../../assets/exec_headshots/quentin.png';
import { Quentin_des } from '../Exec_Descriptions';

const useStyles = makeStyles({
  grid_container : {
    margin : "50px 30px",
    padding : "20px 20px",
    display : "flex",
    flexDirection : "row",
    backgroundColor : "white",
    borderRadius : '20px',
    borderColor : "#97B6E4",
    borderWidth : "2px",
    borderStyle : "solid",
    boxShadow : "5px 5px 5px grey"
  },
  headshot_container : {
    flex : "2",
    backgroundRepeat: "no-repeat",
    backgroundImage : `url(${headshot})`,
    backgroundPosition : "center center",
    height : "250px",
    minWidth : "300px"
  },
  content_container : {
    flex : "5",
    display : 'flex',
    flexDirection : "column"
  }
})


const Quentin = withRouter(function () {
  const classes = useStyles();

  const name = "Professor Quentin Eichbaum";
  const title = "CONSAMS Executive, Founding Member";
  const degree = "M.D, Ph.D, MPH, MFA, MMHC, JD, MEd, FACP, FASCP";
  const des = Quentin_des.toString();

  return (
    <div className={classes.grid_container}>
      <div className={classes.headshot_container}/>
      <div className={classes.content_container}>
        <Typography variant="h6" style={{ marginTop : "10px"}}>
          {title}
        </Typography>
        <Typography variant="h4">
          <strong>{name}</strong> 
        </Typography>
        <Typography variant="h6">
          {degree}
        </Typography>
        <br/>
        <Typography sx={{ fontSize : "14px"}}>
          {des}
        </Typography>
      </div>
    </div>
  )
})

export default Quentin