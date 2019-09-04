import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import Landing from '../Landing';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
      <Route exact path={ROUTES.HOME} component={Home} />
      

    </div>
  </Router>
);

export default App;