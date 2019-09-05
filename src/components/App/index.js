import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
      ? this.props.firebase.db.collection('users').doc(authUser.uid).get()
        .then(snapShot => this.setState({ authUser: snapShot.data() }))
      : this.setState({ authUser: null })
    });
  }

  render() {
    const { authUser } = this.state
    return(
        <div>
          <Navigation authUser={authUser} />
            <hr />
              <Switch>
                <Route exact path={ROUTES.LANDING} component={Landing} />
                <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
                <Route exact path={ROUTES.SIGN_UP} render={() => <SignUp />} />
                {
                  authUser
                  ? <Route exact path={ROUTES.HOME} render={() => <Home authUser={authUser}/> }/>
                  : null
                } 
              </Switch>
        </div>
      
    );
  }
};

export default withFirebase(App);