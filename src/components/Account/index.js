import React, { Component } from 'react';

import { Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button } from 'reactstrap';

import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import '../../App.css';

class Account extends Component {
  onClick = (event) => {
    event.preventDefault();
    this.props.history.push(`${ROUTES.ACCOUNT}/${this.props.authUser.id}`)
  }

  render(){
    const favs = this.props.authUser.favs
    const cardInfo = this.props.authUser
    return (
      <div className='account-card'>
        <Card>
          <CardImg top width='100%' src='USER IMAGE' alt='User Image' />
          <CardBody>
            <CardTitle>Username: {cardInfo.username}</CardTitle>
            <CardSubtitle>Email:  {cardInfo.email}</CardSubtitle>
            <CardText>Favorites:{favs}</CardText>
            <Button onClick={this.onClick}>Edit Account Info</Button>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default withRouter(withFirebase(Account));