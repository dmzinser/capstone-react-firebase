import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

import { 
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';

class PasswordChange extends Component {
  state = {
    passwordOne: '',
    passwordTwo: '',
    error: null
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { passwordOne } = this.state;
    this.props.firebase.doPasswordUpdate(passwordOne)
    .then(() => {
      this.props.history.push(ROUTES.ACCOUNT)
    })
    .catch(error => {
      this.setState({ error });
    });
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';
    return(
      <Container className='form'>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label>Password:</Label>
            <Input
              name='passwordOne'
              value={this.state.passwordOne}
              onChange={this.onChange}
              type='password'
              placeholder='New PassWord'
              />
          </FormGroup>
          <FormGroup>
            <Label>Re-Type Password</Label>
            <Input
              name='passwordTwo'
              value={this.state.passwordTwo}
              onChange={this.onChange}
              type='password'
              placeholder='Confirm New PassWord'
              />
          </FormGroup>
          <Button disabled={isInvalid} type='submit'>
            Reset My PassWord
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </Container>
    );
  }
}

export default withRouter(withFirebase(PasswordChange));