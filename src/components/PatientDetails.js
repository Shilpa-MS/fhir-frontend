import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';


const instance = Axios.create({
  baseURL:
    "http://fhirmashup-cors-http-aceistio3.cloud-integration-ocp45-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
}));

const PatientDetails = (props) => {
  const params = useParams();
  const classes = useStyles();
  const [data, setPatient] = useState([]);
  const [loaded,setLoaded] = useState(false)
  useEffect(() => {
    async function getPatient() {
      const request = await instance.get(`${props.path}${params.id}`);
      if(request.data){
          setPatient(request.data)
        setLoaded(true);
        } 
      else 
      setPatient([])
      
      console.log("Request...", data.length);
      return request;
    }
    getPatient();
  }, [props.path, params.id,data]);

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography variant="h5">Patient Details - {params.id}</Typography>
        </Grid>

        {loaded?(<React.Fragment>
            <Grid item>
          <Grid container direction="column">
            <Grid item style={{marginTop:"2em"}}>
              <Typography variant="h6" gutterBottom>Patient</Typography>
            </Grid>
            <Grid item >
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Last Updated</TableCell>
                      <TableCell>Firstname</TableCell>
                      <TableCell>Lastname</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Birthdate</TableCell>
                      <TableCell>Deceased</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{data.patient.id}</TableCell>
                      <TableCell>{data.patient.lastUpdatedDate}</TableCell>
                      <TableCell>{data.patient.firstName}</TableCell>
                      <TableCell>{data.patient.lastName}</TableCell>
                      <TableCell>{data.patient.gender}</TableCell>
                      <TableCell>{data.patient.birthDate}</TableCell>
                      <TableCell>
                        {data.patient.deceased ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item style={{marginTop:"2em"}}>
              <Typography variant="h6" gutterBottom>Observation</Typography>
            </Grid>
            <Grid item>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Effective Date</TableCell>
                      <TableCell colSpan={3}>Value Quantity</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}></TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Unit</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{data.observation.id}</TableCell>
                      <TableCell>{data.observation.category}</TableCell>
                      <TableCell>{data.observation.description}</TableCell>
                      <TableCell>
                        {data.observation.effectiveDateTime}
                      </TableCell>
                      <TableCell>
                        {data.observation.valueQuantity.value}
                      </TableCell>
                      <TableCell>
                        {data.observation.valueQuantity.unit}
                      </TableCell>
                      <TableCell>
                        {data.observation.valueQuantity.system}
                      </TableCell>
                      <TableCell>
                        {data.observation.valueQuantity.code}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column">
              <Grid item style={{marginTop:"2em"}}>
                <Typography variant="h6" gutterBottom>Encounter</Typography>
              </Grid>
              <Grid item>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell colSpan={2}>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell colSpan={2}>Period</TableCell>
                        <TableCell colSpan={2}>Practitioner</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Reference</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell></TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Reference</TableCell>
                        <TableCell>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{data.encounter.id}</TableCell>
                        <TableCell>
                          {data.encounter.location.reference}
                        </TableCell>
                        <TableCell>
                          {data.encounter.location.description}
                        </TableCell>
                        <TableCell>{data.encounter.status}</TableCell>
                        <TableCell>{data.encounter.period.start}</TableCell>
                        <TableCell>{data.encounter.period.end}</TableCell>
                        <TableCell>
                          {data.encounter.practitioner.reference}
                        </TableCell>
                        <TableCell>
                          {data.encounter.practitioner.name}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column">
              <Grid item style={{marginTop:"2em"}}>
                <Typography variant="h6" gutterBottom>Allergy Intolerance</Typography>
              </Grid>
              <Grid item>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Criticality</TableCell>
                        <TableCell>Onset Date</TableCell>
                        <TableCell>Recorded Date</TableCell>
                        <TableCell>Recorder Reference</TableCell>
                        <TableCell>Asserter Reference</TableCell>
                        <TableCell>Last Occurance</TableCell>
                        <TableCell colSpan={4}>Reaction</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={9}></TableCell>
                        <TableCell>Test Substance</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Onset</TableCell>
                        <TableCell>Severity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{data.allergyintolerance.id}</TableCell>
                        <TableCell>{data.allergyintolerance.type}</TableCell>
                        <TableCell>
                          {data.allergyintolerance.category}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.criticality}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.onsetdatetime}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.recordedDate}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.recorderReference}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.asserterReference}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.lastOccurrence}
                        </TableCell>

                        <TableCell>
                          {data.allergyintolerance.reaction.testSubstance}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.reaction.description}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.reaction.onset}
                        </TableCell>
                        <TableCell>
                          {data.allergyintolerance.reaction.severity}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        </React.Fragment>):(<LinearProgress/>)}
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            component={Link}
            to="/view-patients"
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PatientDetails;
