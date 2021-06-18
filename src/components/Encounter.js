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
  root:{
    flexGrow:1,
    padding:"3em"
  }
}));

const Encounter = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
    
      <Grid container direction="row" className={classes.root} alignItems="center" justify="space-evenly">
        <Grid item>
          <Typography variant="h4" gutterBottom align="center">Encounter</Typography>
          <Button
              variant="contained"
              color="secondary"
              style={{ margin:"4em 2em" }}
              component={Link}
              to="/view-encounters"
            >
              View all Encounter
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin:"4em 0em" }}
              component={Link}
              to="/view-encounter-by-id"
            >
              View Encounter by Id
            </Button>
        </Grid>
        <Grid item>
          <img src="/Encounter.gif" alt="Observation" style={{width:"30em",height:"30em"}}/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Encounter;
