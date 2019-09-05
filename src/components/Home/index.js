import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Home extends Component {
  state = {
    currentLocation: { 
      lat: '',
      lng: ''
    }, 
      loading: true
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.setState({
        currentLocation: { lat: latitude, lng: longitude },
        loading: false
      });
    })
  }
  render() {
    const { loading, currentLocation } = this.state;
    const { google } = this.props;
    if (loading) {
      return null;
    }
    return (
      <Map
        google={google} 
        initialCenter={currentLocation}
        zoom={14}
        style={mapStyles}
      />
    )
  }
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY})(Home);