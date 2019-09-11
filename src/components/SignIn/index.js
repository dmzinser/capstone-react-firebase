import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import { 
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';
import { PasswordForgetLink } from '../PasswordForget';

const SignIn = () => (
  <div>
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
      <Container className='form'>
        <h2>Sign In</h2>
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Email Address:</Label>
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
          <Button type='submit' disabled={isInvalid}>Sign In</Button>
          {error && error.message}
          <PasswordForgetLink />
        </Form>
      </Container>
    )
  };
};

const SignInForm = compose(
  withRouter,
  withFirebase)(SignInFormBase);

export default SignIn;