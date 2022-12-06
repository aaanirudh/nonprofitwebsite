import React from "react";
import { withRouter } from "react-router-dom";

import background300 from "../assets/images/background-300px.png";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Quentin from "./Exec_Grids/Quentin";
import Penniecook from "./Exec_Grids/Penniecook";
import Christians from "./Exec_Grids/Christians";
import Saka from "./Exec_Grids/Saka";
import Maciel from "./Exec_Grids/Maciel";
import Falayi from "./Exec_Grids/Falayi";
import Kamya from "./Exec_Grids/Kamya";
import Kafwamfwa from "./Exec_Grids/Kafwamfwa";
import Vainio from "./Exec_Grids/Vainio";

const useStyles = makeStyles({
  leadership_container: {
    display: "flex",
    flexDirection: "column",
  },
  top_photo: {
    height: "300px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${background300})`,
    opacity: 0.8,
  },
  leadership_content: {
    paddingLeft: "200px",
    paddingRight: "200px",
    paddingTop: "100px",
    paddingBottom: "100px",
    boxShadow: "0px -5px 10px grey",
  },
});

const Leadership = withRouter(function () {
  const classes = useStyles();

  return (
    <div className={classes.leadership_container}>
      <div className={classes.top_photo} />
      <div style={{ backgroundColor: "white" }}>
        <div className={classes.leadership_content}>
          <Typography variant="h3" style={{ marginBottom: "15px" }}>
            <strong>Executive Committee</strong>
          </Typography>

          <Divider style={{ marginBottom: "30px " }} />

          <Penniecook />
          <Christians />
          <Saka />
          <Maciel />
          <Falayi />
          <Kamya />
          <Kafwamfwa />
          <Vainio />

          <Quentin />
        </div>
      </div>
    </div>
  );
});

export default Leadership;
