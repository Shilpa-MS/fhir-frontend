import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Axios from "axios";
import {
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";

const baseURL =
  "https://api.eu-gb.apiconnect.appdomain.cloud/rsanthoshtcscom-dev/sb/fhirmedicationservice/v1/medicationrequest?identifier=santhosh456835";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "3em",
  },
  cell:{
    border : "1px solid black",
    padding:"0.25em"
  }
}));

const MedicineReq = () => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Login");
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [fetchStatus, setFetchStatus] = useState(false);
  const [fetchSuccess,setFetchSuccess]=useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleLogin = async () => {
    localStorage.setItem("username", username);
    if (username === "user1") {
      const instance = Axios.create({
        baseURL,
        headers: { "X-IBM-Client-Id": "e2cd5871-a3ee-4837-9bed-079b73452e21" },
      });
      await instance
        .get()
        .then((res) => {
          console.log("Res is...", res);
          setResponse(res);
          console.log("Response is ...", response);
          setFetchSuccess(true);
        })
        .catch((err) => {
          console.log("Err is..", err);
          setFetchStatus(true);
          setError("User is not authorized!");
        });
    } else {
      // const instance = Axios.create({ baseURL });
      setFetchStatus(true);
      setError("User is not authorized!");

      // await instance
      //   .get()
      //   .then((res) => {
      //     console.log("Res is...", res);
      //   })
      //   .catch((err) => {
      //     console.log("Err is..", err);
      //     setFetchStatus(true);
      //     setError("User is not authorized!");
      //   });
    }

    setOpenDialog(false);
    setButtonText("Logout");
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setButtonText("Login");
    setError("");
  };

  const handleClick = () => {
    if (buttonText === "Login") handleOpenDialog();
    else handleLogout();
  };

  const login = (
    <React.Fragment>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleLogin}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  const medicationTable = fetchSuccess?(
    <React.Fragment>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>ID</TableCell>
              <TableCell className={classes.cell}> Status</TableCell>
              <TableCell className={classes.cell} colSpan={3}>
                Medication Reference
              </TableCell>
              <TableCell className={classes.cell} colSpan={2}>
                {" "}
                Practitioner
              </TableCell>
              <TableCell className={classes.cell}>Encounter</TableCell>
              <TableCell className={classes.cell}>Disease</TableCell>
              <TableCell className={classes.cell}>Authored On</TableCell>

              <TableCell className={classes.cell}>Dosage Instruction</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.cell}></TableCell>
              <TableCell className={classes.cell}></TableCell>

              <TableCell className={classes.cell}>Reference</TableCell>
              <TableCell className={classes.cell}>Display</TableCell>
              <TableCell className={classes.cell}>Medicine Name</TableCell>
              <TableCell className={classes.cell}>Reference</TableCell>
              <TableCell className={classes.cell}>Display</TableCell>
              <TableCell className={classes.cell}></TableCell>
              <TableCell className={classes.cell}></TableCell>
              <TableCell className={classes.cell}></TableCell>
              <TableCell className={classes.cell}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
            <TableCell className={classes.cell}>6fb8325f-990e-4d0a-957c-3f1274e498e1</TableCell>
              <TableCell className={classes.cell}>active</TableCell>

              <TableCell className={classes.cell}>Medication/179ac51cdcb-6b470b77-4330-416c-901c-81a0ab671f89</TableCell>
              <TableCell className={classes.cell}>Prescribed medication</TableCell>
              <TableCell className={classes.cell}>Alprazolam 0.25mg Oral Tablet</TableCell>
              <TableCell className={classes.cell}>Practitioner/afdadf</TableCell>
              <TableCell className={classes.cell}>Dr. Adam Careful</TableCell>
              <TableCell className={classes.cell}>Encounter/encounterId</TableCell>
              <TableCell className={classes.cell}>2015-05-27</TableCell>
              <TableCell className={classes.cell}>anxiety</TableCell>
              <TableCell className={classes.cell}>Take one tablet as idrected</TableCell>
            </TableRow>
          
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  ):undefined;
  return (
    <React.Fragment>
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Typography variant="h5" gutterBottom>
                Medication Requests
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ marginLeft: "auto", marginRight: 10 }}
                onClick={handleClick}
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          {buttonText === "Login" ? (
            <Alert severity="error">Please Login to use this feature</Alert>
          ) : error === "" ? (
            medicationTable
          ) : (
            <Alert severity="error">{error}</Alert>
          )}

        </Grid>
        <Grid item></Grid>
        {login}
      </Grid>
    </React.Fragment>
  );
};

export default MedicineReq;
