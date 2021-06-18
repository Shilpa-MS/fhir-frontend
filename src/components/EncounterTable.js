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
    background:theme.palette.common.bn3

  }
}));
const EncounterTable = (props) => {
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
        Encounter Data
      </Typography>
        </Grid>
        <Grid item>

        
     
      {patients?(<TableContainer component={Paper}>
        <Table className={classes.table} >
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell className={classes.cellHead}>ID</TableCell>
              <TableCell className={classes.cellHead}>Status</TableCell>
              <TableCell className={classes.cellHead}>Class</TableCell>
              <TableCell className={classes.cellHead}>Subject</TableCell>
              <TableCell className={classes.cellHead} colSpan={2}>Participant</TableCell>
              <TableCell className={classes.cellHead}>Location</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.cellHead}></TableCell>
              <TableCell className={classes.cellHead}></TableCell>
              <TableCell className={classes.cellHead}></TableCell>
              <TableCell className={classes.cellHead}></TableCell>
              <TableCell className={classes.cellHead} >Reference</TableCell>
              <TableCell className={classes.cellHead}>Name</TableCell>
              <TableCell className={classes.cellHead}></TableCell>
            </TableRow>
           
          </TableHead>
          <TableBody>
           {
             patients.map(patient=>{
              return (
              <TableRow>
              <TableCell className={classes.cell}>
              {patient.resource['id']}
              </TableCell>
         
              <TableCell className={classes.cell}>{patient.resource.status}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.class.display}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.subject.reference}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.participant[0].individual.reference}</TableCell>
              <TableCell className={classes.cell}>{patient.resource.participant[0].individual.display}</TableCell>

              <TableCell className={classes.cell}>{patient.resource.location[0].location.display}</TableCell>
              
            </TableRow>
             )})
           }

           
          </TableBody>
        </Table>
      </TableContainer>):<Typography className={classes.message}>No data Found!</Typography>}
      <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/encounter"
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

export default withRouter(EncounterTable);
