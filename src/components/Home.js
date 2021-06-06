import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography,Grid } from "@material-ui/core";
 

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    color: "white",
  },
  topLeft: {
    position: "absolute",
    bottom: "1rem",
    left: "16px",
  },
  root:{
    flexGrow:1,
    padding:"3em"
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <div className={classes.container}>
        <img
          src="/tcs-cover.jpg"
          alt="TCS health cover"
          style={{ width: "100%",height:"100%" }}
        />
        <Typography className={classes.topLeft} variant="h2">TCS FHIR<br/>General Practitioner Portal</Typography>
      </div> */}
      <Grid container direction="row" className={classes.root} alignItems="center" justify="space-evenly">
        <Grid item>
          <Typography variant="h3" gutterBottom>Welcome, Practitioner!</Typography>
          <Typography variant="body1" style={{color:"grey"}}>FHIR portal for General Practitioners.</Typography>
        </Grid>
        <Grid item>
          <img src="/64216-super-nurse-animation.gif" alt="practitioner" style={{width:"30em",height:"30em"}}/>

        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Home;
