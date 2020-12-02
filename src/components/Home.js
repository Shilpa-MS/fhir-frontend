import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

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
}));

const Home = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.container}>
        <img
          src="/tcs-cover.jpg"
          alt="TCS health cover"
          style={{ width: "100%",height:"35rem" }}
        />
        <Typography className={classes.topLeft} variant="h2">TCS FHIR<br/>Data Resources...</Typography>
      </div>
    </React.Fragment>
  );
};

export default Home;
