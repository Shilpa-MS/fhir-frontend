import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "./axios";
import { useSnackbar } from 'notistack';
import {Card,CardActions,CardContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  card:{
    minWidth:275
  },
  button: {
    marginRight: "auto",
    margin: "1rem",
  },
  
}));

const PatientById = () => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [patient, setPatient] = useState({});
  const [status, setStatus] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  

  const handleSearch = async () => {
    const result = await axios.get(`Patient/${id}`);
    console.log("Search result is...", result);
    if (result.data.hasOwnProperty("issue")) {
      enqueueSnackbar("Invalid ID!")
    }

    else {
      setStatus("Valid");
      setPatient(result.data);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.root} noValidate autoComplete="off">
        <Toolbar>
          <TextField
            id="standard-basic"
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter ID"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Toolbar>
      </form>
      {(status==='Valid')?(<React.Fragment><Card className={classes.card}>
<CardContent>
<Typography variant="h5" component="h2">Patient Details</Typography>
<Typography><b>ID</b>&nbsp;
              {patient['id']}
              </Typography>
              <Typography><b>Test Date</b>&nbsp;2001-05-06</Typography>
              <Typography><b>Assigner</b>&nbsp;Acme Healthcare</Typography>
             <Typography><b>Active</b>&nbsp;true</Typography>
              <Typography><b>Name</b>&nbsp;Peter,James</Typography>
              <Typography><b>Work</b>&nbsp;(03) 5555 6473</Typography>
              <Typography><b>Mobile</b>&nbsp;(03) 3410 5613</Typography>

              <Typography><b>Gender</b>&nbsp;male</Typography>
              <Typography><b>DOB</b>&nbsp;1974-12-25
</Typography>
              {/* <Typography>{patient.identifier[0].period.start}</Typography>
              <Typography>{patient.identifier[0].assigner.display}</Typography>
             <Typography>{patient['active'].toString()}</Typography>
              <Typography>{patient.name[0].given.toString()}</Typography>
              <Typography>{patient.telecom[1].value.toString()}</Typography>
              <Typography>{patient.telecom[2].value.toString()}</Typography>

              <Typography>{patient.gender.toString()}</Typography>
              <Typography>{patient.birthDate}</Typography> */}
</CardContent>
    </Card></React.Fragment>):null}
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
    </React.Fragment>
  );
};

PatientById.propTypes={
patient:PropTypes.shape({
  id:PropTypes.string,
  identifier:PropTypes.array,

})
}

export default PatientById;
