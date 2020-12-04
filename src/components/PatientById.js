import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "./axios";
import { useSnackbar } from "notistack";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
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
}));

const PatientById = () => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [patient, setPatient] = useState({});
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSearch = async (e) => {
    e.preventDefault();
    const result = await axios.get(`Patient/${id}`);
    console.log("Search result is...", result);
    if (result.data.hasOwnProperty("issue")) {
      enqueueSnackbar("Invalid ID!");
    } else {
      setTimeout(()=>{      setStatus("Valid");
    },2000)
      setPatient(result.data);
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
            type="submit"
            color="primary"
            disabled={id.length===0||id===" "}
           
          >
            <SearchIcon />
          </IconButton>
    
      </form>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/patient"
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
                Patient Details
              </Typography>
              <hr/>
              <Typography>
                <b>ID</b>&nbsp;
                {patient["id"]}
              </Typography>
              
              <Typography><b>Test Date</b>&nbsp;{patient.identifier[0].period.start}</Typography>
              <Typography><b>Assigner</b>&nbsp;{patient.identifier[0].assigner.display}</Typography>
              <Typography><b>Active</b>&nbsp;{patient["active"].toString()}</Typography>
              <Typography><b>Name</b>&nbsp;{patient.name[0].given.toString()}</Typography>
              <Typography><b>Work</b>&nbsp;{patient.telecom[1].value.toString()}</Typography>
              <Typography><b>Mobile</b>&nbsp;{patient.telecom[2].value.toString()}</Typography>

              <Typography><b>Gender</b>&nbsp;{patient.gender.toString()}</Typography>
              <Typography><b>DOB</b>&nbsp;{patient.birthDate}</Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      ) : <LinearProgress color="secondary"/>}
     
    </React.Fragment>
  );
};

PatientById.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    identifier: PropTypes.array,
  }),
};

export default PatientById;
