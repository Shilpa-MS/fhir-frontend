import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Card, CardContent } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    // "& > *": {
    //   margin: theme.spacing(1),
    //   width: "25ch",
    // },
    flexGrow:1,
    padding:"2em",
 
  },
  card: {
    minWidth: 275,
    margin:"0 3em"
  },
  button: {
    marginLeft: "auto",
    marginRight:"1rem"
   
  },
  subHeading:{
      color:theme.palette.common.blue
  }
}));

const baseURL="http://node-to-fhir-server-git-fhir.cp4i2021-tcs-jumpstart-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/AllergyIntolerance?patient="

const AllergyById = (props) => {
  const classes = useStyles();
  const [id, setId] = useState("");
  const [allergy, setAllergy] = useState({});
  const [status, setStatus] = useState("loading");
  const { enqueueSnackbar } = useSnackbar();

  const handleSearch = async (e) => {
    e.preventDefault();
    const instance = axios.create({ baseURL: baseURL + id });
    await instance
      .get()
      .then((res) => {
        if (res.data.total > 0) {
          setAllergy(res.data.entry[0]);
          console.log("Fetch success...", res.data);
          console.log("Patient is...", allergy);
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

  return (
    <React.Fragment>
              <Toolbar>

      <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>handleSearch(e)}>
          <TextField
            id="standard-basic"
            onChange={(event) => setId(event.target.value)}
            placeholder="Enter ID"
            
          />
          <IconButton
            // variant="contained"
            type="submit"
            color="primary"
            disabled={id.length===0||id===" "}
            // onClick={handleSearch}
            // endIcon={<SearchIcon />}
            // className={classes.button}
          >
            <SearchIcon />
          </IconButton>
    
      </form>
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
      </Toolbar>

      {status === "loading" ? null : status === "Valid" ? (
        <React.Fragment>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Allergy Details
              </Typography>
              <hr/>
              <Typography>
                <b>ID</b>&nbsp;
                {allergy.resource["id"]}
              </Typography>
              <Typography><b>Last Occurrence</b>&nbsp;{allergy.resource["lastOccurrence"]}</Typography>
              <Typography><b>Categories</b>&nbsp;{allergy.resource["category"]}</Typography>
              <Typography><b>Criticality</b>&nbsp;{allergy.resource["criticality"]}</Typography>
              <Typography><b>Description</b>&nbsp;{allergy.resource.note[0]["text"]}</Typography>
              <Typography variant="h6" component="h3" className={classes.subHeading}>Substance</Typography>
              <Typography><b>System</b>&nbsp;{allergy.resource.reaction[0]["substance"].coding[0]["system"]}</Typography>
              <Typography><b>Code</b>&nbsp;{allergy.resource.reaction[0]["substance"].coding[0]["code"]}</Typography>
              <Typography><b>Display</b>&nbsp;{allergy.resource.reaction[0]["substance"].coding[0]["display"]}</Typography>
              <Typography variant="h6" component="h3" className={classes.subHeading}>Manifestation</Typography>
              <Typography><b>System</b>&nbsp;{allergy.resource.reaction[1]["manifestation"][0].coding[0]["system"]}</Typography>
              <Typography><b>Code</b>&nbsp;{allergy.resource.reaction[1]["manifestation"][0].coding[0]["code"]}</Typography>
              <Typography><b>Display</b>&nbsp;{allergy.resource.reaction[1]["manifestation"][0].coding[0]["display"]}</Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      ) : <LinearProgress color="secondary"/>}
     
    </React.Fragment>
  );
};



export default AllergyById;
