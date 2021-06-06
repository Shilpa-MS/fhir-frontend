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

const Allergy = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <div className={classes.container}>
        <Grid container direction="column">
          <img
            src="/allergy.jpg"
            alt="Allergy Intolerance cover"
            style={{ width: "100%", height: "35rem" }}
          />
          <Grid item xs className={classes.topLeft}>
            <Typography variant="h2">Allergy Intolerance...</Typography>
            <br />
          </Grid>
          <Grid item xs className={classes.body}>
            <Typography variant="body1">
              Some dummy text here about allergy intolerance.
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="column" >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "50%", left: "2em" }}
              component={Link}
              to="/view-allergy"
            >
              View all Allergy
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              style={{ position: "absolute", top: "50%", left: "20em" }}
              component={Link}
              to="/view-allergy-by-id"
            >
              View Allergies by Id
            </Button>
          </Grid>
        </Grid>
      </div> */}
       <Grid container direction="row" className={classes.root} alignItems="center" justify="space-evenly">
        <Grid item>
          <Typography variant="h4" gutterBottom align="center">Allergy Intolerance</Typography>
          <Button
              variant="contained"
              color="secondary"
              style={{ margin:"4em 2em" }}
              component={Link}
              to="/view-allergy"
            >
              View all Allergy
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin:"4em 0em" }}
              component={Link}
              to="/view-allergy-by-id"
            >
              View Allergies by Id
            </Button>
        </Grid>
        <Grid item>
          <img src="/11767-howard-peanut-allergy.gif" alt="Allergy" style={{width:"30em",height:"30em"}}/>
        </Grid>
      </Grid>
      
    </React.Fragment>
  );
};

export default Allergy;
