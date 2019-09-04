import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import Navigation from '../Navigation';
import Landing from '../Landing';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  state = {
    authUser: null
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.setState({ authUser })
      : this.setState({ authUser: null })
    });
  }

  render() {
    return(
      <Router>
        <div>
          <Navigation authUser={this.state.authUser} />
            <hr />
              <Route exact path={ROUTES.LANDING} component={Landing} />
              <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
              <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
              <Route exact path={ROUTES.HOME} component={Home} />
        </div>
      </Router>
    );
  }
};

export default withFirebase(App);