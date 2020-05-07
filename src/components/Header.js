import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './Header.css';


class Header extends React.Component {

  render() {
    return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">The Pauper Deck Library</Navbar.Brand>
            {/* <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav> */}
          </Container>
        </Navbar>

        {/* <Jumbotron fluid className="jumbotron">
          <Container>
            <h1 className="mainTitle">Pauper Deck Library</h1>
            <p className="subTitle">
              This is a collection of Pauper Decks.
            </p>
          </Container>
        </Jumbotron> */}
      </header>
    )
  }

}

export default Header;
