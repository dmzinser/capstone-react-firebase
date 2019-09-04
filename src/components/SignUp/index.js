import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = () => (
  <div>
    <h1>Sign Up</h1>
     <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  state={
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
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
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === ''

    return(
      <form onSubmit={this.onSubmit}>
        <input 
          name='username'
          value={username}
          onChange={this.onChange}
          type='text'
          placeholder='username'
        />
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
        <input 
        name='passwordTwo'
        value={passwordTwo}
        onChange={this.onChange}
        type='password'
        placeholder='Confirm Password'
        />
        <button type='submit' disabled={isInvalid}>Sign Up!</button>
        {error && error.message}
      </form>
    )
  };
};

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;