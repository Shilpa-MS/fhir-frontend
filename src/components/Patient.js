import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    color: "#36454f",
  },
  topLeft: {
    position: "absolute",
    top: "2em",
    left: "2em",
    // fontWeight:100
  },
  body: {
    position: "absolute",
    top: "10em",
    left: "2em",
    // fontWeight:100
  },
}));

const Patient = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid container direction="column">
          <img
            src="/patient.svg"
            alt="Patient cover"
            style={{ width: "100%", height: "35em" }}
          />
          <Grid item xs className={classes.topLeft}>
            <Typography variant="h2">Patients...</Typography>
            <br />
          </Grid>
          <Grid item xs className={classes.body}>
            <Typography variant="body1">
              Some dummy text here about patient.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "40%", left: "2em" }}
              component={Link}
              to="/view-patients"
            >
              View all Patients
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "40%", left: "20em" }}
            >
              View Patient by Id
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Patient;
