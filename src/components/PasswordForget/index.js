import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';

import { 
  Container,
  Button,
  Form,
  FormGroup,
  Input 
} from 'reactstrap';

import * as ROUTES from '../../constants/routes';


const PasswordForget = () => (
  <div>
    <h1>Password Forget</h1>
    <PasswordForgetForm />
  </div>
);

class PasswordForgetFormBase extends Component {
  state = {
    email: '',
    error: null
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    this.props.firebase.doPasswordReset(email)
    .then(() => {
      this.props.history.push(ROUTES.LANDING)
    })
    .catch(error => {
      this.setState({error})
    })
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { email, error } = this.state
    const isInvalid = email === ''
    return(
      <Container className='form'>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input name='email'
              value={this.state.email}
              onChange={this.onChange}
              type='text'
              placeholder='Email Address'
            />
          </FormGroup>
          <Button disabled={isInvalid} type='submit'>
            Reset My Password
          </Button>
          {error && <p>{error.message}</p>}
        </Form>
      </Container>
    );
  }
}

const PasswordForgetLink = () => (
  <p><Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));

export { PasswordForgetForm, PasswordForgetLink };

export default PasswordForget;