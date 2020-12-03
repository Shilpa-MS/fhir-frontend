import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import Header from './Header';
import Home from './Home';
import Observation from './Observation';
import Patient from './Patient';
import AllergyIntolerance from './AllergyIntolerance';
import PatientTable from './PatientTable';
import PatientById from './PatientById';
import ObservationTable from './ObservationTable';
import ObservationById from './ObservationById';
import AllergyTable from './AllergyTable';

import { SnackbarProvider } from 'notistack';


import {BrowserRouter,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
       <SnackbarProvider>
       <BrowserRouter>
        <Header/>

        <Switch>
          <Route exact path='/' component={()=>(<Home/>)}/>
          <Route path="/account" component={()=>(<div>Account</div>)}/>
          <Route path="/allergy-intolerance" component={()=>(<AllergyIntolerance/>)}/>
          <Route path="/claim" component={()=>(<div>Claim</div>)}/>
          <Route path="/insurance-plan" component={()=>(<div>Insurance Plan</div>)}/>
          <Route path="/observation" component={()=>(<Observation/>)}/>
          <Route path="/encounter" component={()=>(<div>Encounter</div>)}/>
          <Route path="/patient" component={()=>(<Patient/>)}/>
          <Route path="/view-patients" component={()=>(<PatientTable path="Patient"/>)}/>
          <Route path="/view-patient-by-id" component={()=>(<PatientById path="Patient"/>)}/>
          <Route path="/view-observations" component={()=>(<ObservationTable path="Observation"/>)}/>
          <Route path="/view-observation-by-id" component={()=>(<ObservationById path="Observation"/>)}/>
          <Route path="/view-allergy" component={()=>(<AllergyTable path="AllergyIntolerance"/>)}/>

        </Switch>
        </BrowserRouter>
       </SnackbarProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
