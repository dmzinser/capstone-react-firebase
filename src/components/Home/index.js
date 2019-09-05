import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Home extends Component {
  render() {
    return (
      <Map google={this.props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: 34.0522,
        lng: -118.2437
      }}>
      </Map>
    );
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY})(Home);