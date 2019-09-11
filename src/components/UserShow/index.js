import React, { Component } from 'react';

import { 
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import PasswordChange from '../PasswordChange';
import { PasswordForgetLink } from '../PasswordForget';

class UserShow extends Component {
  state = {
    username: '',
    email: '',
    error: null
  };
  
  onClickUpdate = (event) => {
    event.preventDefault();
    // update the user info
    // reroute to ACCOUNT
  };

  onClickDelete = (event) => {
    event.preventDefault();
    // delete user account
    // reroute to landing
  };

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  render() {
    const userInfo = this.props.authUser || {}
    const isInvalid = this.state.username === ''
    return(
        <Container className='form'>
          <Form>
            <FormGroup>
              <Label>Username: {userInfo.username}</Label>
              <Input
                name='username'
                value={this.username}
                onChange={this.onChange}
                type='text'
                placeholder='Username'
                />
            </FormGroup>
              <Button disabled={isInvalid} type='submit' onClick={this.onClickUpdate}> Update Username</Button>
            <FormGroup>
              <PasswordChange />
              <PasswordForgetLink />
            </FormGroup>
              <Label>Favorites:</Label><br/>
              <Button onClick={this.onClickDelete}>Delete Account</Button>
          </Form>
        </Container>
    )
  }
}

export default withRouter(withFirebase(UserShow));