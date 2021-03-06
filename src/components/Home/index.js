import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Container, Row, Col } from 'reactstrap';
import LocationCard from '../LocationCard';

import '../../App.css';

class Home extends Component {
  state = {
    showInfoWindow: false,
    activeMarker: {},
    selectedMaker: null
  }
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedMarker: props,
      activeMarker: marker,
      showInfoWindow: true
    })
  }

  onClose = () => {
    if(this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    const mapStyles = {
      width: '90%',
      height: '80vh'
    };
    return (
      <Container className='homePage'>
        <Row>
          <Col className='Map-page'>
              <Map google={this.props.google}
              initialCenter={this.props.currentLocation}
              zoom={14}
              style={mapStyles}
              mapTypeControl={false}
              streetViewControl={false}
              >
                {this.props.tacos.businesses &&
                  this.props.tacos.businesses.map((t, i) => {
                    return (
                      <Marker onClick={this.onMarkerClick}
                        key={i} position={{
                        lat: t.coordinates.latitude,
                        lng: t.coordinates.longitude
                        }} 
                        info={t}
                      />
                    )
                  })
                }
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showInfoWindow}
                  onClose={this.onClose}
                  >
                  {
                    this.state.selectedMarker &&
                    <div className='infoWindow'>
                      <h2>{this.state.selectedMarker.info.name}</h2>
                      <h3>{this.state.selectedMarker.info.location.address1}</h3>
                      <h3>{this.state.selectedMarker.info.location.city}, {this.state.selectedMarker.info.location.state} {this.state.selectedMarker.info.location.zip_code}</h3>
                      <p>Rating: {this.state.selectedMarker.info.rating}</p>
                      <a href={this.state.selectedMarker.info.phone}>{this.state.selectedMarker.info.display_phone}</a><br/>
                      <img src={this.state.selectedMarker.info.image_url} style={{maxWidth: '100px'}}/>
                    </div>
                  }
                </InfoWindow>
              </Map>
          </Col>
          <Col className='location-wrapper'>
              {this.props.tacos.businesses &&
                this.props.tacos.businesses.map((t, i) => {
                  return (
                      <LocationCard
                        key={i}
                        info={t}
                        authUser={this.props.authUser}
                        updateAuthUser={this.props.updateAuthUser}
                      />
                      )
                    })
                  }
          </Col>
        </Row>
      </Container>
    )
  };
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY})(Home);