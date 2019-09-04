import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
     <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <SignOut />
      </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
  </ul>
);

export default Navigation;