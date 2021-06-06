import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import data from "../data/FHIRMashupOutput.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3em",
  },
  cell: {
    border: "1px solid black",
    padding: "0.2em",
  },
  cellHead:{
    border:"1px solid black",
    padding:"0.2em",
    color:"white"
  },
  patientHead:{
    background:theme.palette.common.bn1
  },
  observationHead:{
    background:theme.palette.common.bn2
  },
  encounterHead:{
    background:theme.palette.common.bn3
  },
  allergyHead:{
    background:theme.palette.common.bn4
  }
}));

const Display = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Data Display
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Patient</Typography>
            </Grid>
            <Grid item>
              <TableContainer>
                <Table>
                  <TableHead className={classes.patientHead}>
                    <TableRow>
                      <TableCell className={classes.cellHead}>ID</TableCell>
                      <TableCell className={classes.cellHead}>
                        Last Updated
                      </TableCell>
                      <TableCell className={classes.cellHead}>Firstname</TableCell>
                      <TableCell className={classes.cellHead}>Lastname</TableCell>
                      <TableCell className={classes.cellHead}>Gender</TableCell>
                      <TableCell className={classes.cellHead}>Birthdate</TableCell>
                      <TableCell className={classes.cellHead}>Deceased</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        {data.patient.id}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.lastUpdatedDate}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.firstName}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.lastName}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.gender}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.birthDate}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.patient.deceased ? "Yes" : "No"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{padding:"2em 0"}}>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h6">Observation</Typography>
            </Grid>
            <Grid item>
              <TableContainer>
                <Table>
                  <TableHead className={classes.observationHead}>
                    <TableRow>
                      <TableCell className={classes.cellHead}>ID</TableCell>
                      <TableCell className={classes.cellHead}>Category</TableCell>
                      <TableCell className={classes.cellHead}>
                        Description
                      </TableCell>
                      <TableCell className={classes.cellHead}>
                        Effective Date
                      </TableCell>
                      <TableCell colSpan={4} className={classes.cellHead}>
                        Value Quantity
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className={classes.cellHead}
                      ></TableCell>
                      <TableCell className={classes.cellHead}>Value</TableCell>
                      <TableCell className={classes.cellHead}>Unit</TableCell>
                      <TableCell className={classes.cellHead}>System</TableCell>
                      <TableCell className={classes.cellHead}>Code</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cell}>
                        {data.observation.id}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.category}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.description}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.effectiveDateTime}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.valueQuantity.value}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.valueQuantity.unit}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.valueQuantity.system}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {data.observation.valueQuantity.code}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid item style={{padding:"2em 0"}}>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="h6">Encounter</Typography>
              </Grid>
              <Grid item>
                <TableContainer>
                  <Table>
                    <TableHead className={classes.encounterHead}>
                      <TableRow>
                        <TableCell className={classes.cellHead}>ID</TableCell>
                        <TableCell colSpan={2} className={classes.cellHead}>
                          Location
                        </TableCell>
                        <TableCell className={classes.cellHead}>Status</TableCell>
                        <TableCell colSpan={2} className={classes.cellHead}>
                          Period
                        </TableCell>
                        <TableCell colSpan={2} className={classes.cellHead}>
                          Practitioner
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.cellHead}></TableCell>
                        <TableCell className={classes.cellHead}>
                          Reference
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Description
                        </TableCell>
                        <TableCell className={classes.cell}></TableCell>
                        <TableCell className={classes.cellHead}>Start</TableCell>
                        <TableCell className={classes.cellHead}>End</TableCell>
                        <TableCell className={classes.cellHead}>
                          Reference
                        </TableCell>
                        <TableCell className={classes.cellHead}>Name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.cell}>
                          {data.encounter.id}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.location.reference}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.location.description}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.status}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.period.start}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.period.end}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.encounter.practitioner.reference}
                        </TableCell>
                        <TableCell className={classes.cell}>
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
              <Grid item>
                <Typography variant="h6" >Allergy Intolerance</Typography>
              </Grid>
              <Grid item>
                <TableContainer>
                  <Table>
                    <TableHead className={classes.allergyHead}>
                      <TableRow>
                        <TableCell className={classes.cellHead}>ID</TableCell>
                        <TableCell className={classes.cellHead}>Type</TableCell>
                        <TableCell className={classes.cellHead}>Category</TableCell>
                        <TableCell className={classes.cellHead}>
                          Criticality
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Onset Date
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Recorded Date
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Recorder Reference
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Asserter Reference
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Last Occurance
                        </TableCell>
                        <TableCell className={classes.cellHead} colSpan={4}>
                          Reaction
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          className={classes.cellHead}
                          colSpan={9}
                        ></TableCell>
                        <TableCell className={classes.cellHead}>
                          Test Substance
                        </TableCell>
                        <TableCell className={classes.cellHead}>
                          Description
                        </TableCell>
                        <TableCell className={classes.cellHead}>Onset</TableCell>
                        <TableCell className={classes.cellHead}>Severity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.id}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.type}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.category}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.criticality}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.onsetdatetime}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.recordedDate}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.recorderReference}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.asserterReference}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.lastOccurrence}
                        </TableCell>

                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.reaction.testSubstance}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.reaction.description}
                        </TableCell>
                        <TableCell className={classes.cell}>
                          {data.allergyintolerance.reaction.onset}
                        </TableCell>
                        <TableCell className={classes.cell}>
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
      </Grid>
    </React.Fragment>
  );
};

export default Display;
