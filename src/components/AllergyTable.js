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
import { Link } from "react-router-dom";
import axios from "./axios";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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
  cell:{
    border:"1px solid black",
    padding:"0.1em"
  },
  root:{
    flexGrow:1,
    padding:"3em"
  }
}));
const AllergyTable = (props) => {
  const classes = useStyles();
  const [allergy, setAllergy] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      if (request.total !== 0) setAllergy(request.data.entry);
      else setAllergy([]);
      console.log(request.data.entry);
      return request;
    }
    getPatient();
  }, [props.path]);

  return (
    <React.Fragment>
      <Grid container className={classes.root} direction="column">
        <Grid item>
        <Typography variant="h4" className={classes.heading} gutterBottom>
        Allergy Intolerance Data
      </Typography>
        </Grid>
        <Grid item>
        {allergy ? (
        <TableContainer component={Paper}>
          <Table  >
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>ID</TableCell>
                <TableCell className={classes.cell}>Last Occurance</TableCell>
                <TableCell className={classes.cell}>Categories</TableCell>
                <TableCell className={classes.cell}>Criticality</TableCell>
                <TableCell className={classes.cell}>Description</TableCell>
                <TableCell colSpan={3} className={classes.cell}>Substance</TableCell>
                <TableCell colSpan={3} className={classes.cell}>Manifestation</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.cell}></TableCell>
                <TableCell className={classes.cell}></TableCell>
                <TableCell className={classes.cell}></TableCell>
                <TableCell className={classes.cell}></TableCell>
                <TableCell className={classes.cell}></TableCell>

                <TableCell className={classes.cell}>System</TableCell>
                <TableCell className={classes.cell}>Code</TableCell>
                <TableCell className={classes.cell}>Display</TableCell>
                <TableCell className={classes.cell}>System</TableCell>
                <TableCell className={classes.cell}>Code</TableCell>
                <TableCell className={classes.cell}>Display</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allergy.map((allergy) => (
                <TableRow>
                  <TableCell className={classes.cell}>{allergy["resource"]["id"]}</TableCell>
                  <TableCell className={classes.cell}>{allergy["resource"]["lastOccurrence"]}</TableCell>
                  <TableCell className={classes.cell}>{allergy["resource"]["category"]}</TableCell>
                  <TableCell className={classes.cell}>{allergy["resource"]["criticality"]}</TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].note
                      ? allergy["resource"].note[0]["text"]
                      : ""}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].reaction[0]["substance"]
                      ? allergy["resource"].reaction[0]["substance"].coding[0][
                          "system"
                        ]
                      : ""}
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].reaction[0]["substance"]?
                      allergy["resource"].reaction[0]["substance"].coding[0][
                        "code"
                      ]:""
                    }
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].reaction[0]["substance"]?
                      allergy["resource"].reaction[0]["substance"].coding[0][
                        "display"
                      ]:""
                    }
                  </TableCell>
                  <TableCell className={classes.cell}>
                     {allergy["resource"].reaction[1]?
                      allergy["resource"].reaction[1]["manifestation"][0]
                        .coding[0]["system"]:""
                    }
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].reaction[1]?
                      allergy["resource"].reaction[1]["manifestation"][0]
                        .coding[0]["code"]:""
                    }
                  </TableCell>
                  <TableCell className={classes.cell}>
                    {allergy["resource"].reaction[1]?
                      allergy["resource"].reaction[1]["manifestation"][0]
                        .coding[0]["display"]:""
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className={classes.message}>No record found!</Typography>
      )}
        </Grid>
        <Grid item>
        <Button
        variant="contained"
        color="secondary"
        component={Link}
        to="/allergy-intolerance"
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

export default AllergyTable;
