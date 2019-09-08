import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

class SignOut extends Component {
  logoutHandler = (event) => {
    event.preventDefault();
    this.props.firebase.doSignOut().then(() => {
      this.props.history.push(ROUTES.LANDING)
    })
  }
  render() {
    return(
      <button type='button' onClick={this.logoutHandler}>
        Sign Out
      </button>
    )
  }
}

export default withRouter(withFirebase(SignOut));