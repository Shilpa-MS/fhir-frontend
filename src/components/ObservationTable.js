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
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
  heading: {
    color: theme.palette.common.blue,
    textAlign: "center",
    fontWeight: 200,
  },
  button: {
    marginRight: "auto",
    marginTop: "1rem",
  },
  message: {
    textAlign: "center",
    color: theme.palette.common.red,
  },
  cell: {
    border: "1px solid black",
    padding: "0.1em",
  },
}));
const ObservationTable = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      if (request.total !== 0) setPatients(request.data.entry);
      else setPatients([]);
      console.log("Request...", request.data.entry);
      return request;
    }
    getPatient();
  }, [props.path]);

  return (
    <React.Fragment>
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <Typography variant="h4" className={classes.heading} gutterBottom>
            Observation Data
          </Typography>
        </Grid>
        <Grid item>
          {patients ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.cell}>ID</TableCell>
                    <TableCell className={classes.cell}>Test Date</TableCell>
                    <TableCell className={classes.cell} colSpan={3}>
                      Tag
                    </TableCell>
                    <TableCell className={classes.cell} colSpan={3}>
                      Coding Category
                    </TableCell>
                    <TableCell className={classes.cell} colSpan={3}>
                      Coding
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.cell}></TableCell>
                    <TableCell className={classes.cell}></TableCell>
                    <TableCell className={classes.cell}>System</TableCell>
                    <TableCell className={classes.cell}>Code</TableCell>
                    <TableCell className={classes.cell}>Display</TableCell>
                    <TableCell className={classes.cell}>System</TableCell>
                    <TableCell className={classes.cell}>Code</TableCell>
                    <TableCell className={classes.cell}>Display</TableCell>
                    <TableCell className={classes.cell}>System</TableCell>
                    <TableCell className={classes.cell}>Code</TableCell>
                    <TableCell className={classes.cell}>Display</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map((patient) => (
                    <TableRow>
                      <TableCell className={classes.cell}>
                        {patient.resource.id}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.effectiveDateTime}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.meta.tag
                          ? patient.resource.meta.tag[0].system
                          : ""}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.meta.tag
                          ? patient.resource.meta.tag[0].code
                          : ""}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.meta.tag
                          ? patient.resource.meta.tag[0].display
                          : ""}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.category
                          ? patient.resource.category[0].coding[0].system
                          : ""}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.category
                          ? patient.resource.category[0].coding[0].code
                          : ""}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {patient.resource.category
                          ? patient.resource.category[0].coding[0].display
                          : ""}
                      </TableCell>

                      <TableCell className={classes.cell}>
                        {" "}
                        {patient.resource.code.coding.map((code) => (
                          <React.Fragment>
                            {code.system}
                            <br />
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {" "}
                        {patient.resource.code.coding.map((code) => (
                          <React.Fragment>
                            {code.code}
                            <br />
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell className={classes.cell}>
                        {" "}
                        {patient.resource.code.coding.map((code) => (
                          <React.Fragment>
                            {code.display}
                            <br />
                          </React.Fragment>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography className={classes.message}>
              No Record found!
            </Typography>
          )}
        </Grid>
        <Grid item>
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ObservationTable;
