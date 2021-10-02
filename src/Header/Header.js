import React from 'react';
import { Navbar, Nav, NavbarBrand} from 'reactstrap';
import {HeaderAbout, Home} from './HeaderComponents'
import "./Header.css";

export default function Header(props) {
    return (
        <Navbar id="header" light expand="sm" fixed="top" className="navbar-expand-lg navbar-dark bg-ninac sticky-top">
            <NavbarBrand href="/" className={"ps-3"}>
                Cám theo tuần của Béo
            </NavbarBrand>
            <Nav className="mr-auto" navbar>
                <Home/>
                <HeaderAbout/>
            </Nav>
        </Navbar>
    );
}
