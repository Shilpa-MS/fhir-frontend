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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import axios from "./axios";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
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
}));
const AllergyTable = (props) => {
  const classes = useStyles();
  const [allergy, setAllergy] = useState([]);

  useEffect(() => {
    async function getPatient() {
      const request = await axios.get(`${props.path}`);
      setAllergy(request.data.entry);
      console.log(request.data.entry)
      return request;
    }
    getPatient();
  }, [props.path]);



  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.heading}>
        Allergy Intolerance Data
      </Typography>
      {allergy.length>0?(<TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>ID</TableCell>
              <TableCell colSpan={3}>Substance</TableCell>
              <TableCell colSpan={3}>Manifestation</TableCell>           
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Last Occurance</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell>Criticality</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Display</TableCell>
              <TableCell>System</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Display</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {
             allergy.map(allergy=>(
              <TableRow>
              <TableCell>{allergy["resource"]["id"]}</TableCell>
              <TableCell>{allergy["resource"]["lastOccurrence"]}</TableCell>
              <TableCell>{allergy["resource"]["category"]}</TableCell>
              <TableCell>{allergy["resource"]["criticality"]}</TableCell>
              <TableCell>{allergy["resource"].note[0]["text"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[0]["substance"].coding[0]["system"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[0]["substance"].coding[0]["code"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[0]["substance"].coding[0]["display"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[1]["manifestation"][0].coding[0]["system"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[1]["manifestation"][0].coding[0]["code"]}</TableCell>
              <TableCell>{allergy["resource"].reaction[1]["manifestation"][0].coding[0]["display"]}</TableCell>
            </TableRow>
             ))
           }

           
          </TableBody>
        </Table>
      </TableContainer>):<LinearProgress/>}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/allergy-intolerance"
        size="small"
        className={classes.button}
      >
        Back
      </Button>
    </React.Fragment>
  );
};

export default AllergyTable;
