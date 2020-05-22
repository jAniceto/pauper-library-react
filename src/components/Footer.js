import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import './Footer.css';


class Footer extends React.Component {

  render() {
    return (
      <footer className="footer mt-5 pt-3 pb-3 bg-light">
        <Container>
          <Row>
            <Col>
              <span className="text-muted">
                Created by <a href="https://www.reddit.com/message/compose/?to=Synergix" target="_blank" rel="noopener noreferrer">u/Synergix</a>
              </span>
            </Col>
          </Row>
        </Container>
      </footer>
    )
  }

}

export default Footer;