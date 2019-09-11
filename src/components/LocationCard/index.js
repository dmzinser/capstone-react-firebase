import React from 'react';

import { Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button } from 'reactstrap';

import { withFirebase } from '../Firebase'

const LocationCard = (props) => {

  const addToFavs = () => {
    const userId = props.firebase.auth.currentUser.uid
    props.firebase.user(userId).update({
      favs: props.firebase.firestore.FieldValue.arrayUnion(props.info.id)
    }).then(() => {
      props.updateAuthUser(userId)
    })
  };

  const deleteFromFavs = () => {
    const userId = props.firebase.auth.currentUser.uid
    props.firebase.user(userId).update({
      favs: props.firebase.firestore.FieldValue.arrayRemove(props.info.id)
    }).then(() => {
      props.updateAuthUser(userId)
    })
  };

  const isFav = props.authUser.favs && props.authUser.favs.some(f => f.includes(props.info.id))
  

  return(
    <div className='location-card'>
    <Card>
      <CardImg top width='100%' height='auto' src={props.info.image_url} alt='Yelp Restaurant Image' />
      <CardBody>
        <CardTitle>{props.info.name}</CardTitle>
        <CardSubtitle>Card subtitle</CardSubtitle>
        <CardText>{props.info.location.display_address}</CardText>
        {
          isFav
            ? <Button onClick={deleteFromFavs}>Remove</Button>
            : <Button onClick={addToFavs}>Favorite</Button>
        }
      </CardBody>
    </Card>
  </div>
  );
}

export default withFirebase(LocationCard);