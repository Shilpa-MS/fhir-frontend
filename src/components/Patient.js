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
  },
  body: {
    position: "absolute",
    top: "10em",
    left: "2em",
  },
}));

const Patient = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* <div className={classes.container}>
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
              component={Link}
              to="/view-patient-by-id"
            >
              View Patient by Id
            </Button>
          </Grid>
        </Grid>
      </div> */}

      <Grid container direction="row" className={classes.root} alignItems="center" justify="space-evenly">
        <Grid item>
          <Typography variant="h4" gutterBottom align="center">Patient</Typography>
          <Button
              variant="contained"
              color="secondary"
              style={{ margin:"4em 2em" }}
              component={Link}
              to="/view-patients"
            >
              View all Patients
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin:"4em 0em" }}
              component={Link}
              to="/view-patient-by-id"
            >
              View Patient by Id
            </Button>
        </Grid>
        <Grid item>
          <img src="/18646-medic-clinic.gif" alt="Observation" style={{width:"30em",height:"30em"}}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Patient;
