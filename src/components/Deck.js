import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardRow from './CardRow';
import './Deck.css';
import '../css/mana.css';


class Deck extends React.Component {

  render() {
    // Number of different cards in mainboard + sideboard
    const uniqueCards = this.props.stats.mainboard.length + this.props.stats.sideboard.length;
    // Distribute mainboard over 2 columns
    const nCol1Cards = Math.floor(uniqueCards/2) + 2;
    const col1MainboardCards = this.props.stats.mainboard.slice(0, nCol1Cards);
    const remainingMainboardCards = this.props.stats.mainboard.slice(nCol1Cards);
    // Create HTML for mainboard (col 1), mainboard (col 2), and sideboard
    const col1Mainboard = col1MainboardCards.map((card, index) => 
      <CardRow key={index} cardInfo={card} />
    );
    const remainingMainboard = remainingMainboardCards.map((card, index) => 
      <CardRow key={index} cardInfo={card} />
    );
    const sideboard = this.props.stats.sideboard.map((card, index) => 
      <CardRow key={index} cardInfo={card} />
    );
    
    return (
      <div className="Deck mt-3">
        <Card>
          <Card.Header as="h1">{this.props.stats.name}</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Table borderless size="sm">
                  <tbody>
                    {col1Mainboard}
                  </tbody>
                </Table>
              </Col>
              <Col md={4}>
                <Table borderless size="sm">
                  <tbody>
                    {remainingMainboard}
                  </tbody>
                </Table>
                <h5 className="card-title">Sideboard:</h5>
                <Table borderless size="sm">
                  <tbody>
                    {sideboard}
                  </tbody>
                </Table>
              </Col>
              <Col md={4}>
                <Button variant="outline-dark" block>Dark</Button>
                
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }

}

export default Deck;
