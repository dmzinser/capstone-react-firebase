import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import * as ROUTES from '../../constants/routes';

const SignIn = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
  </div>
);

class SignInFormBase extends Component {
  state = {
    email: '',
    passwordOne: '',
    error: null
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;
    this.props.firebase.doSignInWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      this.props.history.push(ROUTES.HOME)
    })
    .catch(error => {
      this.setState({error})
    });
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    const {
      email,
      passwordOne,
      error
    } = this.state

    const isInvalid =
      email ==='' ||
      passwordOne === ''

    return(
      <form onSubmit={this.onSubmit}>
        <input
          name='email'
          value={email}
          onChange={this.onChange}
          type='text'
          placeholder='Email Address'
        />
        <input
          name='passwordOne'
          value={passwordOne}
          onChange={this.onChange}
          type='password'
          placeholder='Password'
        />
        <button type='submit' disabled={isInvalid}>Sign In</button>
        {error && error.message}
      </form>
    )
  };
};

const SignInForm = compose(
  withRouter,
  withFirebase)(SignInFormBase);

export default SignIn;