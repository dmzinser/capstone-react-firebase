import React from 'react';
import { NavLink } from 'react-router-dom';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>
    {authUser 
    ? <NavigationAuth authUser={authUser}/>
    : <NavigationNonAuth />}
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
     <li>
        <NavLink to={ROUTES.HOME}>Home</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.TACOS}>Tacos</NavLink>
      </li>
      <li>
        {authUser.username} <SignOut />
      </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
        <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
      </li>
      <li>
        <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
      </li>
  </ul>
);

export default Navigation;