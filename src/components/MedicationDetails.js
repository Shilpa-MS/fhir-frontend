import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

let baseURL="http://fhirmediservice-http-aceistio3.cloud-integration-ocp45-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/fhirmedicationservice/v1/medicationrequest?identifier=";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3em",
  },
  cell:{
    border : "1px solid black"
  }
}));

const MedicationDetails = (props) => {
  const classes = useStyles();
  const [id, setId] = useState(" ");
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    baseURL+=id;
    console.log("Base url",baseURL)

    const instance = Axios.create({baseURL});

    const request = await instance.get();
    if (request.data) {
      setData(request.data);
      console.log("Res is...",request)
      setLoaded(true);
    } else setData({});

    //   return request;

    console.log("ID entered is...", id);
    console.log("Medication is ", data);
  };

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justify="space-between"
        className={classes.root}
      >
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Pharmacy
          </Typography>
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off" onSubmit={(e) => handleSearch(e)}>
            <TextField
              id="standard-basic"
              onChange={(event) => setId(event.target.value)}
              placeholder="Enter ID"
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={id.length === 0 || id === " "}
            >
              <SearchIcon />
            </IconButton>
          </form>
        </Grid>
        <Grid item>
          {loaded ? (
            <React.Fragment>
                <Typography variant="h6">Patient</Typography>
              <TableContainer>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                       <TableCell className={classes.cell}>ID</TableCell>
                       <TableCell className={classes.cell}>Unique ID</TableCell>
                       <TableCell className={classes.cell}>Last Updated</TableCell>
                       <TableCell className={classes.cell}>First Name</TableCell>
                       <TableCell className={classes.cell}>Last Name</TableCell>
                       <TableCell className={classes.cell}>Gender</TableCell>
                       <TableCell className={classes.cell}>Birth Date</TableCell>
                       <TableCell className={classes.cell}>Deceased</TableCell>
                       <TableCell className={classes.cell}>Mobile</TableCell>
                       <TableCell className={classes.cell}>Address</TableCell>
                   </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell className={classes.cell}>{data.patient.id}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.identifier}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.lastUpdatedDate}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.firstName}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.lastName}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.gender}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.birthDate}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.deceased?"true":"false"}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.mobile}</TableCell>
                       <TableCell className={classes.cell}>{data.patient.address[0].text}</TableCell>
                        </TableRow>
                    </TableBody>
                  
                </Table>
              </TableContainer>
              <Typography variant="h6" style={{paddingTop:"1em"}}>Medication</Typography>
              <TableContainer>
                <Table size="small">
                    <TableHead>
                    <TableRow>
                       <TableCell className={classes.cell}>ID</TableCell>
                       <TableCell className={classes.cell}>Status</TableCell>
                       <TableCell colSpan={3} className={classes.cell}>Medication Reference</TableCell>
                       <TableCell colSpan={2} className={classes.cell}>Practitioner</TableCell>
                       <TableCell colSpan={1} className={classes.cell}>Encounter</TableCell>
                       <TableCell className={classes.cell}>Authored On</TableCell>
                       <TableCell className={classes.cell}>Disease</TableCell>
                       <TableCell className={classes.cell}>Dosage Instruction</TableCell>
                   </TableRow>
                   <TableRow>
                       <TableCell colSpan={2} className={classes.cell}></TableCell>
                       <TableCell className={classes.cell}>Reference</TableCell>
                       <TableCell className={classes.cell}>Display</TableCell>
                       <TableCell className={classes.cell}>Medicine Name</TableCell>
                       <TableCell className={classes.cell}>Reference</TableCell>
                       <TableCell className={classes.cell}>Display</TableCell>
                       <TableCell className={classes.cell}>Reference</TableCell>
                       <TableCell colSpan={3} className={classes.cell}> </TableCell>
                      
                   </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                        <TableCell className={classes.cell}>{data.medication.id}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.status}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.medicationReference.reference}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.medicationReference.display}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.medicationReference.medicineName}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.practitioner.reference}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.practitioner.display}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.encounter.reference}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.authoredOn}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.disease}</TableCell>
                       <TableCell className={classes.cell}>{data.medication.dosageInstruction[0].text}</TableCell>

                        </TableRow>
                    </TableBody>
                  
                </Table>
              </TableContainer>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <LinearProgress />
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MedicationDetails;
