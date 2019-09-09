import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

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

    const isInvalid = 
    userInfo.username === '' ||
    userInfo.email === ''

    return(
      <div className='basic-card'>
        <Card>
          <CardImg top width='100%' src='USER IMAGE' alt='Yelp Restaurant Image' />
          <CardBody>
            <CardTitle>{userInfo.username}</CardTitle>
            <CardSubtitle>CARD SUBTITLE</CardSubtitle>
            <CardText>Favorites:</CardText>
            <Button type='submit' disabled={isInvalid} onClick={this.onClickUpdate}> Update Account Info</Button>
            <Button onClick={this.onClickDelete}>Delete Account</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(withFirebase(UserShow));