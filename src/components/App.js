import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme";
import Header from './Header';
import Home from './Home';
import Observation from './Observation';
import Patient from './Patient';
import PatientTable from './PatientTable'

import {BrowserRouter,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Header/>

        <Switch>
          <Route exact path='/' component={()=>(<Home/>)}/>
          <Route path="/account" component={()=>(<div>Account</div>)}/>
          <Route path="/allergy-intolerance" component={()=>(<div>Allergy Intolerance</div>)}/>
          <Route path="/claim" component={()=>(<div>Claim</div>)}/>
          <Route path="/insurance-plan" component={()=>(<div>Insurance Plan</div>)}/>
          <Route path="/observation" component={()=>(<Observation/>)}/>
          <Route path="/encounter" component={()=>(<div>Encounter</div>)}/>
          <Route path="/patient" component={()=>(<Patient/>)}/>
          <Route path="/view-patients" component={()=>(<PatientTable path="Patient"/>)}/>

        </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
