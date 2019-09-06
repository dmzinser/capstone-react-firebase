import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


class Home extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%'
    };
    console.log(this.props)
    return (
      <Map
        google={this.props.google} 
        initialCenter={this.props.currentLocation}
        zoom={14}
        style={mapStyles}
      />
    )
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY})(Home);