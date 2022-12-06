import React from 'react';
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import headshot from '../../assets/exec_headshots/saka.png';
import { Saka_des } from '../Exec_Descriptions';

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
    backgroundRepeat: "no-repeat",
    backgroundImage : `url(${headshot})`,
    backgroundPosition : "center center",
    height : "250px"

  },
  content_container : {
    flex : "5",
    display : 'flex',
    flexDirection : "column"
  }
})

const Saka = withRouter( function () {
  const classes = useStyles();

  const name = "Professor John D. Kalenga Saka";
  const title = "Immediate Past President";
  const degree = "Vice-Chancellor of Mzuzu University";
  const des = Saka_des.toString();

  return (
    <div className={classes.grid_container}>
      <div style={{ flex : "2", paddingRight : "20px", minWidth : "300px"}}>
        <div className={classes.headshot_container}/>
      </div>
      
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
});

export default Saka