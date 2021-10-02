import React from "react";
import {NavItem, NavLink} from 'reactstrap';

export const Home = props => (
    <NavItem>
        <NavLink href="/">
            Home
        </NavLink>
    </NavItem>
);

export const Schedule = props => (
  <NavItem>
      <NavLink href="/schedule">
          Schedule
      </NavLink>
  </NavItem>
);

export const HeaderLogin = props => (
  <NavItem>
      <NavLink href="/login">Login</NavLink>
  </NavItem>
);

export const HeaderSignup = props => (
  <NavItem>
      <NavLink href="/register">Sign up</NavLink>
  </NavItem>
);

export const HeaderLogout = props => (
    <NavItem>
        <NavLink href="/logout">Log out</NavLink>
    </NavItem>
);

export const HeaderAbout = props => (
    <NavItem>
        <NavLink href="/about">About</NavLink>
    </NavItem>
);
