import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "./axios";
import { useSnackbar } from "notistack";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: "25ch",
    // },
    flexGrow:1
  },
  card: {
    minWidth: 275,
  },
  button: {
    marginLeft: "auto",
    marginRight:"1rem"
   
  },
  subHeading:{
      color:theme.palette.common.blue
  }
}));

const ObservationById = () => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [observation, setObservation] = useState({});
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await axios.get(`Observation/${id}`);
    console.log("Search result is...", result);
    if (result.data.hasOwnProperty("issue")) {
      enqueueSnackbar("Invalid ID!");
    } else {
      setTimeout(()=>{      setStatus("Valid");
    },2000)
      setObservation(result.data);
    }
  };

  return (
    <React.Fragment>
              <Toolbar>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>handleSearch(e)}>
          <TextField
            id="standard-basic"
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter ID"
            
          />
          <IconButton
            // variant="contained"
            type="submit"
            color="primary"
            disabled={id.length===0||id===" "}
            // onClick={handleSearch}
            // endIcon={<SearchIcon />}
            // className={classes.button}
          >
            <SearchIcon />
          </IconButton>
    
      </form>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/observation"
        size="small"
        className={classes.button}
      >
        Back
      </Button>
      </Toolbar>

      {status === "loading" ? null : status === "Valid" ? (
        <React.Fragment>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Observation Details
              </Typography>
              <hr/>
              <Typography>
                <b>ID</b>&nbsp;
                {observation["id"]}
              </Typography>
              
              <Typography><b>Test Date</b>&nbsp;{observation.effectiveDateTime}</Typography>
              <Typography variant="h6" component="h3" className={classes.subHeading}>Tag</Typography>
              <Typography><b>System</b>&nbsp;{observation["meta"]["tag"][0]["system"]}</Typography>
              <Typography><b>Code</b>&nbsp;{observation["meta"]["tag"][0]["code"]}</Typography>
              <Typography><b>Display</b>&nbsp;{observation["meta"]["tag"][0]["display"]}</Typography>
              <Typography variant="h6" component="h3" className={classes.subHeading}>Coding Category</Typography>
              <Typography><b>System</b>&nbsp;{observation["category"][0]["coding"][0]["system"]}</Typography>
              <Typography><b>Code</b>&nbsp;{observation["category"][0]["coding"][0]["code"]}</Typography>
              <Typography><b>Display</b>&nbsp;{observation["category"][0]["coding"][0]["display"]}</Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      ) : <LinearProgress color="secondary"/>}
     
    </React.Fragment>
  );
};



export default ObservationById;
