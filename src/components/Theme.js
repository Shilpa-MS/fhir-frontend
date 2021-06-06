import { createMuiTheme } from '@material-ui/core/styles';

// const fhirBlue="#1a237e";
const fhirBlue="#2196f3";
const fhirRed="#ef5350";
const fhirGreen="#38c172";
const fhirBlack="#000000";
const [bn1,bn2,bn3,bn4]=["#38C194","#38C1B7","#38A9C1","#3887C1"];
export default createMuiTheme({
  palette:{
      common:{
          blue:`${fhirBlue}`,
          red:`${fhirRed}`,
          green:`${fhirGreen}`,
          black:`${fhirBlack}`,
          bn1:`${bn1}`,
          bn2:`${bn2}`,
          bn3:`${bn3}`,
          bn4:`${bn4}`

      },
      primary:{
          main:`${fhirGreen}`,
      },
      secondary:{
          main:`${fhirBlue}`
      },
      
  },
typography:{
     
  drawer:{
    fontFamily:"Roboto",
    textTransform: "none",
    fontWeight:500,
    fontSize:"0.9rem",
    padding:5
  },


}

});

