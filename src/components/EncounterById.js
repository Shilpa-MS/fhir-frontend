import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Card, CardActions, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: "25ch",
    // },
    flexGrow: 1,
    padding:"3em"
  },
  button: {
    margin:"0 1rem 0 auto"
},
  card: {
    minWidth: 275,
    margin:"0 3em"
  },

}));

const baseURL =
  "http://node-to-fhir-server-git-fhir.cp4i2021-tcs-jumpstart-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/Encounter?patient=";

const PatientById = () => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [patient, setPatient] = useState({});
  const [status, setStatus] = useState("loading");
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async (e) => {
    e.preventDefault();
    const instance = axios.create({ baseURL: baseURL + id });
    await instance
      .get()
      .then((res) => {
        if (res.data.total > 0) {
          setPatient(res.data.entry[0]);
          console.log("Fetch success...", res.data);
          console.log("Patient is...", patient);
          setTimeout(() => {
            setStatus("Valid");
          }, 2000);
        } else {
          enqueueSnackbar("Invalid ID!");
        }
      })
      .catch((err) => {
        console.log("Fetch error...", err);
      });

  };

  const handleDelete = async () => {
    const result = await axios.delete(`Patient/${id}`);
    console.log("Search result is...", result);
    setTimeout(() => {
      setStatus("loading");
    }, 2000);
    setPatient({});
    enqueueSnackbar("Deleted successfully!");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Toolbar>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => handleSearch(e)}
        >
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
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/encounter"
          size="small"
          className={classes.button}
        >
          Back
        </Button>
      </Toolbar>

      {status === "loading" ? null : status === "Valid" ? (
        <React.Fragment>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Encounter Details
              </Typography>
              <hr />
              <Typography>
                <b>ID</b>&nbsp;
                {patient["resource"]["id"]}
              </Typography>

              <Typography>
                <b>Status</b>&nbsp;
                {patient.resource.status}
              </Typography>
              <Typography>
                <b>Class</b>&nbsp;
                {patient.resource.class.display}
              </Typography>
              <Typography>
                <b>Subject</b>&nbsp;{patient.resource.subject.reference}
              </Typography>
              <Typography>
                <b>Reference</b>&nbsp;{patient.resource.participant[0].individual.reference}
              </Typography>
              <Typography>
                <b>Name</b>&nbsp;{patient.resource.participant[0].individual.display}
              </Typography>
              <Typography>
                <b>Location</b>&nbsp;
                {patient.resource.location[0].location.display}
              </Typography>

            
            </CardContent>
            {/* <CardActions>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleClickOpen}
              >
                Delete
              </Button>
            </CardActions> */}
          </Card>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Confirm to delete patient data.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                  handleDelete();
                }}
                color="secondary"
                autoFocus
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      ) : (
        <LinearProgress color="secondary" />
      )}
    </React.Fragment>
  );
};

PatientById.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    identifier: PropTypes.array,
  }),
};

export default PatientById;
