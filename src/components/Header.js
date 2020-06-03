import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import logo from '../logo-transparent.svg';
import logoBig from '../pauper-library-logo-white.png';
import './Header.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
              <Nav.Link as={Link} to="/random">Randomize</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* <Jumbotron fluid className="jumbotron bg-dark text-white">
          <Container>
            <Row>
              <Col md={{ span: 9 }}>
                <h1 className="mainTitle">Pauper Deck Library</h1>
                <p className="subTitle text-muted">
                  A curated collection of Pauper Decks.
                </p>
              </Col>
              <Col md={{ span: 2, offset: 1 }}>
                <img
                  alt="logo"
                  src={logoBig}
                  className="d-inline-block align-top w-100"
                />
              </Col>

            </Row>
          </Container> 
        </Jumbotron> */}
      </header>
    )
  }

}

export default Header;
