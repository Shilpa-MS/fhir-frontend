import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField, Select } from "@material-ui/core";
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
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  MenuItem,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";


const instance = Axios.create({
  baseURL:
    "http://fhirmashuprestapi-http-ace.cp4i2021-tcs-jumpstart-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/fhirmashupservice/v1/fhirdata?",
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "2em",
  },
  cell: {
    border: "1px solid black",
    padding:"0.2em"
  },
  cellHead: {
    border: "1px solid black",
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

const PatientDetails = (props) => {
  const params = useParams();
  const classes = useStyles();
  const [data, setPatient] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openMed, setOpenMed] = useState(false);
  const [disease, setDisease] = useState("");
  const [med, setMed] = useState("");
  const [medicationData, setMedicationData] = useState({
    patientId: "",
    firstName: "",
    lastName: "",
    practitionerId: "",
    encounterId: "",
    disease: "",
    medicationDetails: "",
    dosageInstruction: "",
  });
  const [openAlert,setOpenAlert]=useState(false);

  const postUrl="http://fhiraddmedicationdata-http-ace.cp4i2021-tcs-jumpstart-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/fhiraddmedicationservice/v1/medidata";


  useEffect(() => {
    async function getPatient() {
      const request = await instance.get(`${props.path}${params.id}`);
      if (request.data) {
        setPatient(request.data);
        setMedicationData({
          ...medicationData,
          patientId: request.data.patient.id,
          firstName: request.data.patient.firstName,
          lastName: request.data.patient.lastName,
          practitionerId: request.data.encounter.practitioner.reference,
          encounterId: request.data.encounter.id,
        });
        setLoaded(true);
      } else setPatient([]);

      console.log("Request...", data.length);
      return request;
    }
    getPatient();
  }, [props.path, params.id, data]);

  const handleOpenMed = () => {
    setOpenMed(true);
  };
  const handleCloseMed = () => {
    setOpenMed(false);
  };

  const handleDiseaseChange = (e) => {
    setDisease(e.target.value);
    setMedicationData({ ...medicationData, disease: e.target.value });
  };

  const handleMedChange = (e) => {
    setMed(e.target.value);
    setMedicationData({ ...medicationData, medicationDetails: e.target.value });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();

    Axios.post(postUrl,{
      patientId: medicationData.patientId,
      firstName: medicationData.firstName,
      lastName: medicationData.lastName,
      practitionerId: medicationData.practitionerId,
      encounterId: medicationData.encounterId,
      disease: medicationData.disease,
      medicationDetails: medicationData.medicationDetails,
      dosageInstruction: medicationData.dosageInstruction,

    }).then(res=>{
      console.log("Post response is...",res);
      setOpenAlert(true);
    }).catch(err=>{
      console.log("Error in post...",err)
    })

  }

  const addMedDialog = (
    <React.Fragment>
      <Dialog open={openMed} onClose={handleCloseMed}>
        <DialogTitle>
          Add Medication
          <IconButton className={classes.closeIcon} onClick={handleCloseMed}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Patient ID"
            type="id"
            fullWidth
            color="primary"
            defaultValue={medicationData.patientId}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            autoFocus
            id="name"
            label="First Name"
            type="id"
            fullWidth
            color="primary"
            defaultValue={medicationData.firstName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            id="name"
            label="Last Name"
            type="id"
            fullWidth
            color="primary"
            defaultValue={medicationData.lastName}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            id="name"
            label="Practitioner ID"
            type="id"
            fullWidth
            color="primary"
            defaultValue={medicationData.practitionerId}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            autoFocus
            id="name"
            label="Encounter ID"
            type="id"
            fullWidth
            color="primary"
            defaultValue={medicationData.encounterId}
            InputProps={{
              readOnly: true,
            }}
          />
          <InputLabel id="demo-simple-select-label">Disease</InputLabel>

          <Select value={disease} onChange={handleDiseaseChange}>
            <MenuItem key="dis1" value="Oral Chemotherapy">
              Oral Chemotherapy
            </MenuItem>
            <MenuItem key="dis2" value="Arthritis">
              Arthritis
            </MenuItem>
            <MenuItem key="dis3" value="Fungal Infection">
              Fungal Infection
            </MenuItem>
            <MenuItem key="dis4" value="Anxiety">
              Anxiety
            </MenuItem>
            <MenuItem key="dis5" value="Bacterial Infection">
              Bacterial Infection
            </MenuItem>
          </Select>

          <InputLabel id="demo-simple-select-label">
            Medication Details
          </InputLabel>

          <Select value={med} onChange={handleMedChange}>
            <MenuItem
              key="med1"
              value="Capecitabine 500mg oral tablet (Xeloda)"
            >
              Capecitabine 500mg oral tablet (Xeloda)
            </MenuItem>
            <MenuItem key="med2" value="Prednisone (substance)">
              Prednisone (substance)
            </MenuItem>
            <MenuItem key="med3" value="Nystatin 100,000 units/ml oral suspension">
            Nystatin 100,000 units/ml oral suspension
            </MenuItem>
            <MenuItem key="med4" value="Alprazolam 0.25mg Oral Tablet">
            Alprazolam 0.25mg Oral Tablet
            </MenuItem>
            <MenuItem key="med5" value="Amoxilin">
            Amoxilin
            </MenuItem>
          </Select>

          <TextField
            id="password"
            label="Dosage Instruction"
            type="name"
            fullWidth
            onChange={(e) =>
              setMedicationData({
                ...medicationData,
                dosageInstruction: e.target.value,
              })
            }
            color="primary"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleSubmit}>Add</Button>
        </DialogActions>
        {openAlert ? <Alert severity="success">Added successfully</Alert> : null}
      </Dialog>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Grid container direction="column" className={classes.root}>
        <Grid item>
          <Typography variant="h5">Patient Details - {params.id}</Typography>
        </Grid>
        {loaded ? (
          <React.Fragment>
            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ marginTop: "2em" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "auto", marginRight: 10 }}
                    onClick={handleOpenMed}
                  >
                    Create Medication
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: "2em" }}>
                  <Typography variant="h6" gutterBottom>
                    Patient
                  </Typography>
                </Grid>
                <Grid item>
                  <TableContainer>
                    <Table  className={classes.cell}>
                      <TableHead className={classes.patientHead}>
                        <TableRow>
                          <TableCell className={classes.cellHead}>ID</TableCell>
                          <TableCell className={classes.cellHead}>
                            Last Updated
                          </TableCell>
                          <TableCell className={classes.cellHead}>
                            Firstname
                          </TableCell>
                          <TableCell className={classes.cellHead}>
                            Lastname
                          </TableCell>
                          <TableCell className={classes.cellHead}>Gender</TableCell>
                          <TableCell className={classes.cellHead}>
                            Birthdate
                          </TableCell>
                          <TableCell className={classes.cellHead}>
                            Deceased
                          </TableCell>
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
            <Grid item>
              <Grid container direction="column">
                <Grid item style={{ marginTop: "2em" }}>
                  <Typography variant="h6" gutterBottom>
                    Observation
                  </Typography>
                </Grid>
                <Grid item>
                  <TableContainer>
                    <Table  >
                      <TableHead className={classes.observationHead}>
                        <TableRow>
                          <TableCell className={classes.cellHead}>ID</TableCell>
                          <TableCell className={classes.cellHead}>
                            Category
                          </TableCell>
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

              <Grid item>
                <Grid container direction="column">
                  <Grid item style={{ marginTop: "2em" }}>
                    <Typography variant="h6" gutterBottom>
                      Encounter
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TableContainer>
                      <Table  >
                        <TableHead className={classes.encounterHead}>
                          <TableRow>
                            <TableCell className={classes.cellHead}>ID</TableCell>
                            <TableCell colSpan={2} className={classes.cellHead}>
                              Location
                            </TableCell>
                            <TableCell className={classes.cellHead}>
                              Status
                            </TableCell>
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
                            <TableCell className={classes.cellHead}></TableCell>
                            <TableCell className={classes.cellHead}>
                              Start
                            </TableCell>
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
                  <Grid item style={{ marginTop: "2em" }}>
                    <Typography variant="h6" gutterBottom>
                      Allergy Intolerance
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TableContainer>
                      <Table >
                        <TableHead  className={classes.allergyHead}>
                          <TableRow>
                            <TableCell className={classes.cellHead}>ID</TableCell>
                            <TableCell className={classes.cellHead}>Type</TableCell>
                            <TableCell className={classes.cellHead}>
                              Category
                            </TableCell>
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
                              colSpan={9}
                              className={classes.cellHead}
                            ></TableCell>
                            <TableCell className={classes.cellHead}>
                              Test Substance
                            </TableCell>
                            <TableCell className={classes.cellHead}>
                              Description
                            </TableCell>
                            <TableCell className={classes.cellHead}>
                              Onset
                            </TableCell>
                            <TableCell className={classes.cellHead}>
                              Severity
                            </TableCell>
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
          </React.Fragment>
        ) : (
          <LinearProgress />
        )}
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
        {addMedDialog}{" "}
      </Grid>
    </React.Fragment>
  );
};

export default PatientDetails;
