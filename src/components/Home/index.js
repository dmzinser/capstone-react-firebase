import React, { Component } from 'react';
import { Map, Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';
import { Container, Row, Col } from 'reactstrap';
import LocationCard from '../LocationCard';


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
      width: '500px',
      height: '500px'
    };
    return (
      <Container className='homePage'>
        <Row>
          <Col>
            <div className='mapPage'>
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
                    <div className="infoWindow">
                      <h2>{this.state.selectedMarker.info.name}</h2>
                      <h3>{this.state.selectedMarker.info.location.address1}</h3>
                      <h3>{this.state.selectedMarker.info.location.city}, {this.state.selectedMarker.info.location.state} {this.state.selectedMarker.info.location.zip_code}</h3>
                      <p>Rating: {this.state.selectedMarker.info.rating}</p>
                      <a href={this.state.selectedMarker.info.phone}>{this.state.selectedMarker.info.display_phone}</a><br/>
                      <img src={this.state.selectedMarker.info.image_url} style={{maxWidth: "100px"}}/>
                    </div>
                  }
                </InfoWindow>
              </Map>
            </div>
          </Col>
          <Col>
            <div className="Map-cards">
              {this.props.tacos.businesses &&
                this.props.tacos.businesses.map((t, i) => {
                  return (
                      <LocationCard
                        key={i}
                        info={t}
                      />
                      )
                    })
                  }
            </div>
          </Col>
        </Row>
      </Container>
    )
  };
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY})(Home);