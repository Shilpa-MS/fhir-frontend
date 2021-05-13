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
import LinearProgress from '@material-ui/core/LinearProgress';
import PatientDetails from "./PatientDetails";


const useStyles = makeStyles((theme) => ({
  root:{
    flexGrow:1,
    padding:"3em"
  },
  table: {
    minWidth: 650,
    maxWidth:1000
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
      <Grid container direction ="column">
        <Grid item>
        <Typography variant="h4" className={classes.heading}>
        Patient Data
      </Typography>
        </Grid>
        <Grid item>

        
     
      {patients?(<TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>FHIR ID</TableCell>
              <TableCell>Unique ID</TableCell>
              <TableCell>Assigner</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Active Status</TableCell>
              <TableCell>Official First Name</TableCell>
              <TableCell>Official Last Name</TableCell>

              <TableCell>Gender</TableCell>
              <TableCell>BirthDate</TableCell>
              <TableCell>Deceased Status</TableCell>
              <TableCell>General Practitioner</TableCell>


            </TableRow>
           
          </TableHead>
          <TableBody>
           {
             patients.map(patient=>{
              const uniqid= patient.resource.identifier[0].value
              return (
              <TableRow>
              <TableCell>
              {patient.resource['id']}
              </TableCell>
              <TableCell>
                
                <Button component={Link} to={`/view-patient-info/${uniqid}`} className={classes.hyperlink} size="small">{patient.resource.identifier[0].value}</Button>
             
                </TableCell>
              <TableCell>{patient.resource.identifier[0].assigner.display}</TableCell>
             <TableCell>{patient.resource.identifier[0].period.start}</TableCell>
              <TableCell>{patient.resource.active.toString()}</TableCell>
              <TableCell>{patient.resource.name[0].given[0]}</TableCell>
              <TableCell>{patient.resource.name[0].given[1]}</TableCell>

              <TableCell>{patient.resource.gender.toString()}</TableCell>
              <TableCell>{patient.resource.birthDate}</TableCell>
              <TableCell>{patient.resource.deceasedBoolean.toString()}</TableCell>
              <TableCell>{patient.resource.generalPractitioner[0].reference}</TableCell>
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
