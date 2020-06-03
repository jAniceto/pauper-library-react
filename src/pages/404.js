import React from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


class PageNotFound extends React.Component {

  render() {
    return (
      <Container className="text-center">
        <h1 className="display-1 mt-5">404</h1>
        <p className="lead">Oops!</p>
        <p>The page you are looking for does not exist or is currently unavailable.</p>
        <Button as={Link} to="/" variant="outline-dark">Go to homepage</Button>
      </Container>
    );
  }
}

export default PageNotFound;
