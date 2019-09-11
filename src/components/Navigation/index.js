import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  import SignOut from '../SignOut';
  import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>
    {authUser
    ? <NavigationAuth authUser={authUser}/>
    : <NavigationNonAuth />}
  </div>
);

class NavigationAuth extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar light expand='md'>
          <NavbarBrand href='/'>iEatTacos</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {this.props.authUser.username}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to={ROUTES.HOME}>Home</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <SignOut />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
};

class NavigationNonAuth extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <Navbar light expand='md'>
        <NavbarBrand href='/'>iEatTacos</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Get Started
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
    );
  }
};

export default Navigation;