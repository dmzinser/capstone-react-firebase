import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class Account extends Component {
  onClick = (event) => {
    event.preventDefault();
    this.props.history.push(ROUTES.USERSHOW)
  }
  render(){
    const cardInfo = this.props.authUser
   return (
     <div className='basic-card'>
      <Card>
        <CardImg top width='100%' src='USER IMAGE' alt='Yelp Restaurant Image' />
        <CardBody>
          <CardTitle>{cardInfo.username}</CardTitle>
          <CardSubtitle>{cardInfo.email}</CardSubtitle>
          <CardText>Favorites:</CardText>
          <Button onClick={this.onClick}>Edit Account Info</Button>
        </CardBody>
      </Card>
    </div>
  )
  }
}

export default withRouter(withFirebase(Account));