import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const LocationCard = (props) => {
  return(
    <div className='location-card'>
    <Card>
      <CardImg top width='100%' src={props.info.image_url} alt='Yelp Restaurant Image' />
      <CardBody>
        <CardTitle>{props.info.name}</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>{props.info.location.display_address}</CardText>
        <Button>Favorite</Button>
      </CardBody>
    </Card>
  </div>
  );
}

export default LocationCard;