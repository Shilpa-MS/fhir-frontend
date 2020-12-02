import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
// import patients from "../data/patients.json";

const useStyles = makeStyles(theme=>({
  table: {
    minWidth: 650,
  },
  heading:{
    color:theme.palette.common.blue,
    textAlign:"center",
    fontWeight:200,
    margin:"2rem"
  },
  button:{
    marginRight:"auto",
    margin:"1rem"
  }
}));
const PatientTable = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.heading} >Patient Data</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell >Test Date</TableCell>
              <TableCell >Assigner</TableCell>
              <TableCell >Active</TableCell>
              <TableCell >Name</TableCell>
              <TableCell  colSpan={2} >Phone
              </TableCell>
              <TableCell>Gender</TableCell>
              <TableCell >DOB</TableCell>
            </TableRow>
            <TableRow>
            <TableCell></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell  >Work
              </TableCell>
              <TableCell >Mobile</TableCell>
              <TableCell ></TableCell>
              <TableCell></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>

           <TableRow>
           <TableCell>17619504486-5b1e545f-dc76-4bf1-ae89-227230e73ebc</TableCell>
              <TableCell >2001-05-06</TableCell>
              <TableCell >Acme Healthcare</TableCell>
              <TableCell >true</TableCell>
              <TableCell >Peter James</TableCell>
              <TableCell >(03) 555 6473</TableCell>
              <TableCell >(03) 3410 5613</TableCell>

              <TableCell >Male</TableCell>
              <TableCell >1974-12-25</TableCell>
           </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" component={Link} to="/patient" size="small" className={classes.button}>Back</Button>

    </React.Fragment>
  );
};

export default PatientTable;
