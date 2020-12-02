import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    color: "#36454f",
  },
  topLeft: {
    position: "absolute",
    top: "8px",
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

const Observation = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.container}>
        <Grid container direction="column">
          <img
            src="/observation.jpeg"
            alt="Observation cover"
            style={{ width: "100%", height: "35rem" }}
          />
          <Grid item xs className={classes.topLeft}>
            <Typography variant="h2">Observation...</Typography>
            <br />
          </Grid>
          <Grid item xs className={classes.body}>
            <Typography variant="body1">
              Some dummy text here about observation.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "50%", left: "2em" }}
            >
              View all Observations
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "50%", left: "20em" }}
            >
              View Observations by Id
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default Observation;
