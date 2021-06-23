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
import {Typography,Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link,withRouter} from "react-router-dom";
import axios from "./axios";


const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow:1,
    padding:"3em"
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
  message:{
    textAlign:"center",
    color:theme.palette.common.red
  },
  hyperlink:{
    textDecoration:"underline",
    color:theme.palette.common.red,
    textTransform:"none"
  },
  cell:{
    border:"1px solid black",
    padding:"0.3em"
  },
  cellHead:{
    border:"1px solid black",
    padding:"0.3em",
    color:"black"
  },
  tableHead:{
    background:theme.palette.common.bn2

  }
}));
const PatientTable = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      if(request.total!==0)
      setPatients(request.data.entry);
      else
      setPatients([]);
      console.log("Request...",request.data)
      return request;
    }
    getPatient();
  }, [props.path]);



  return (
    <React.Fragment>
      <Grid container direction ="column" className={classes.root}>
        <Grid item>
        <Typography variant="h4" className={classes.heading}>
        Patient Data
      </Typography>
        </Grid>
        <Grid item>

        
     
      {patients?(<TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.cellHead}>FHIR ID</TableCell>
              <TableCell className={classes.cellHead}>Unique ID</TableCell>
              <TableCell className={classes.cellHead}>Assigner</TableCell>
              <TableCell className={classes.cellHead}>Start Date</TableCell>
              <TableCell className={classes.cellHead}>Active Status</TableCell>
              <TableCell className={classes.cellHead}>Official First Name</TableCell>
              <TableCell className={classes.cellHead}>Official Last Name</TableCell>

              <TableCell className={classes.cellHead}>Gender</TableCell>
              <TableCell className={classes.cellHead}>BirthDate</TableCell>
              <TableCell className={classes.cellHead}>Deceased Status</TableCell>
              <TableCell className={classes.cellHead}>General Practitioner</TableCell>


            </TableRow>
           
          </TableHead>
          <TableBody>
           {
             patients.map(patient=>{
              const uniqid= patient.resource.identifier[0].value
              return (
              <TableRow>
              <TableCell className={classes.cell}>
              {patient.resource['id']}
              </TableCell>
              <TableCell className={classes.cell}>
                
                <Button component={Link} to={`/view-patient-info/${uniqid}`} className={classes.hyperlink} size="small">{patient.resource.identifier[0].value}</Button>
             
                </TableCell>
              <TableCell className={classes.cell}>{patient.resource.identifier[0].assigner?patient.resource.identifier[0].assigner["display"]:""}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.identifier[0].period?patient.resource.identifier[0].period["start"]:""}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.active?patient.resource.active.toString():""}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.name[0].given[0]}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.name[0].given[1]}</TableCell>

              <TableCell className={classes.cell}>{patient.resource.gender.toString()}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.birthDate}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.deceasedBoolean.toString()}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.generalPractitioner[0].reference}</TableCell>
            </TableRow>
             )})
           }

           
          </TableBody>
        </Table>
      </TableContainer>):<Typography className={classes.message}>No data Found!</Typography>}
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
      </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withRouter(PatientTable);
