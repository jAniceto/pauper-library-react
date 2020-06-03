import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../logo-transparent.svg';
import './Header.css';


class Header extends React.Component {

  render() {
    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
            <img
              alt="logo"
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Pauper Deck Library
          </Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/">Decks</Nav.Link>
              {/* <Nav.Link as={Link} to="/index">Index</Nav.Link> */}
              <Nav.Link as={Link} to="/random">Randomize</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link href="https://forms.gle/oD6FDZNVqd7MLWqq5" target="_blank">Suggest Decklist</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

      </header>
    )
  }

}

export default Header;
