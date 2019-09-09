import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import Navigation from '../Navigation';
import Landing from '../Landing';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Home from '../Home';
import Account from '../Account';
import UserShow from '../UserShow';

import * as ROUTES from '../../constants/routes';

class App extends Component {
  state = {
    authUser: null,
    currentLocation: { 
      lat: '',
      lng: ''
    }, 
    loading: true,
    tacos: []
  }

  async componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
      ? this.props.firebase.db.collection('users').doc(authUser.uid).get()
        .then(snapShot => this.setState({ authUser: Object.assign(snapShot.data(), {id: snapShot.id}) }))
      : this.setState({ authUser: null })
    });
    await this.getLocation();
  }

  getLocation = async () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      this.setState({
        currentLocation: { lat: latitude, lng: longitude },
        loading: false
      }, () => this.getTacos());
    })
  }

  getTacos = async () => {
    const tacoList= await fetch('http://localhost:5000/ga-capstone-c7083/us-central1/app/api/v1/get-tacos', {
      method: "POST",
      body: JSON.stringify(this.state.currentLocation)
    })
    const parsedTacoList = await tacoList.json()
    this.setState({
      tacos: parsedTacoList.data
    })
  }

  updateAuthUser = id => {
    this.props.firebase.user(id)
      .get()
      .then(snapShot => {
        this.setState({ authUser: Object.assign(snapShot.data(), {id: snapShot.id}) })
      })
  }

  render() {
    const {
      authUser,
      currentLocation,
      loading,
      tacos
    } = this.state
    return(
      <> 
      <div className='nav'>
        <Navigation authUser={authUser} />
      </div>

      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route exact path={ROUTES.SIGN_IN} component={SignIn} />
        <Route exact path={ROUTES.SIGN_UP} render={() => <SignUp />} />
        <Route exact path={`${ROUTES.ACCOUNT}/:id`} render={() => <UserShow authUser={authUser}/>} />
        {
          authUser
          ? <Route exact path={ROUTES.HOME} render={() => <Home 
            authUser={authUser}
            currentLocation={currentLocation}
            loading={loading}
            tacos={tacos} 
            updateAuthUser={this.updateAuthUser}
            /> }/>
          : null
        } 
        {
          authUser
          ? <Route exact path={ROUTES.ACCOUNT} render={() => <Account 
            authUser={authUser}
            tacos={tacos} /> }/>
          : null
        } 
      </Switch>
      </>
    );
  }
};

export default withFirebase(App);