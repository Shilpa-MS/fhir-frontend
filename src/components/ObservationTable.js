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
const ObservationTable = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      setPatients(request.data.entry);
      console.log("Request...",request.data.entry)
      return request;
    }
    getPatient();
  }, [props.path]);



  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.heading}>
        Observation Data
      </Typography>
      {patients?(<TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Test Date</TableCell>
              <TableCell colSpan={3}>Tag</TableCell>
              <TableCell colSpan={3}>Coding Category</TableCell>
              <TableCell colSpan={3}>Coding</TableCell>
             
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>System</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Display</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Display</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Display</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {
             patients.map(patient=>(
              <TableRow>
              <TableCell>{patient.resource.id}</TableCell>
              <TableCell>{patient.resource.effectiveDateTime}</TableCell>
              <TableCell>{patient.resource.meta.tag[0].system}</TableCell>
              <TableCell>{patient.resource.meta.tag[0].code}</TableCell>
              <TableCell>{patient.resource.meta.tag[0].display}</TableCell>
              <TableCell>{patient.resource.category[0].coding[0].system}</TableCell>
              <TableCell>{patient.resource.category[0].coding[0].code}</TableCell>
              <TableCell>{patient.resource.category[0].coding[0].display}</TableCell>
            
              <TableCell>  {
                patient.resource.code.coding.map(code=>(<React.Fragment>{code.system}<br/></React.Fragment>))
              }</TableCell>
              <TableCell>  {
                patient.resource.code.coding.map(code=>(<React.Fragment>{code.code}<br/></React.Fragment>))
              }</TableCell>
              <TableCell>  {
                patient.resource.code.coding.map(code=>(<React.Fragment>{code.display}<br/></React.Fragment>))
              }</TableCell>
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
        to="/observation"
        size="small"
        className={classes.button}
      >
        Back
      </Button>
    </React.Fragment>
  );
};

export default ObservationTable;
