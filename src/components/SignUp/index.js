import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { 
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignUp = (props) => (
  <div>
     <SignUpForm setUserId={props.setUserId}/> 
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
      return this.props.firebase.user(authUser.user.uid)
    .set({
      username, 
      email
    })
    })
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
      <Container className='form'>
        <h2>Sign Up</h2>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Username:</Label>
            <Input 
              name='username'
              value={username}
              onChange={this.onChange}
              type='text'
              placeholder='Username'
            />
          </FormGroup>
          <FormGroup>
            <Label>Email:</Label>
            <Input 
              name='email'
              value={email}
              onChange={this.onChange}
              type='text'
              placeholder='Email Address'
            />
          </FormGroup>
          <FormGroup>
            <Label>Password:</Label>
            <Input 
              name='passwordOne'
              value={passwordOne}
              onChange={this.onChange}
              type='password'
              placeholder='Password'
            />
          </FormGroup>
          <FormGroup>
            <Label>Confirm Password:</Label>
            <Input 
              name='passwordTwo'
              value={passwordTwo}
              onChange={this.onChange}
              type='password'
              placeholder='Confirm Password'
            />
          </FormGroup>
          <Button type='submit' disabled={isInvalid}>Sign Up!</Button>
          {error && error.message}
        </Form>
      </Container>
    )
  };
};

const SignUpForm = compose(
  withRouter,
  withFirebase)(SignUpFormBase);

export default SignUp;