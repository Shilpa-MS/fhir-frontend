import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "./axios";
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  heading: {
    color: theme.palette.common.blue,
    textAlign: "center",
    fontWeight: 200,
    margin: "2rem",
  },
  button: {
    marginRight: "auto",
    margin: "1rem",
  },
}));
const PatientTable = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      setPatients(request.data.entry);
      return request;
    }
    getPatient();
  }, [props.path]);



  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.heading}>
        Patient Data
      </Typography>
      {patients?(<TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Test Date</TableCell>
              <TableCell>Assigner</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Name</TableCell>
              <TableCell colSpan={2}>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Work</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {
             patients.map(patient=>(
              <TableRow>
              <TableCell>
              {patient.resource['id']}
              </TableCell>
              <TableCell>{patient.resource.identifier[0].period.start}</TableCell>
              <TableCell>{patient.resource.identifier[0].assigner.display}</TableCell>
             <TableCell>{patient.resource['active'].toString()}</TableCell>
              <TableCell>{patient.resource.name[0].given.toString()}</TableCell>
              <TableCell>{patient.resource.telecom[1].value.toString()}</TableCell>
              <TableCell>{patient.resource.telecom[2].value.toString()}</TableCell>

              <TableCell>{patient.resource.gender.toString()}</TableCell>
              <TableCell>{patient.resource.birthDate}</TableCell>
            </TableRow>
             ))
           }

           
          </TableBody>
        </Table>
      </TableContainer>):<LinearProgress/>}
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

export default PatientTable;
