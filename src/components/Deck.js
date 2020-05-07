import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CardRow from './CardRow';
// import CMCPlot from './CMCPlot';
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

    // Deck colors
    let colors;
    if (this.props.stats.color) {
      colors = this.props.stats.color.map((color, index) => 
        <i key={index} className={"ms ms-cost ms-" + color}></i>
      );
    } else {
      colors = '';
    }

    // Tags
    const tagsList = this.props.stats.tags;
    // console.log(tagsList);
    const tags = tagsList.map((tag, index) => 
      <span key={index}><kbd>{tag}</kbd> </span>
    );

    // Stats
    const totalCardsMainboard = this.props.stats.mainboard.map(
      card => parseInt(card['quantity'])
    ).reduce((a, b) => a + b, 0);

    const totalCardsSideboard = this.props.stats.sideboard.map(
      card => parseInt(card['quantity'])
    ).reduce((a, b) => a + b, 0);
    
    return (
      <div className="Deck mt-5">
        <Card>
          <Card.Header as="h1">
            <Row>
              <Col md={8}>
                {this.props.stats.name}
              </Col>
              <Col md={4}>
                <div className="float-right d-none d-lg-block">
                    {colors} 
                </div>
              </Col>
            </Row>

            
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <Table borderless size="sm" className="mb-0">
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
                <h6 className="card-title">Sideboard ({totalCardsSideboard}):</h6>
                <Table borderless size="sm">
                  <tbody>
                    {sideboard}
                  </tbody>
                </Table>
              </Col>

              <Col md={4}>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td>Price:</td>
                      <td className="text-right">{this.props.stats.price}</td>
                    </tr>
                    <tr>
                      <td>Total cards:</td>
                      <td className="text-right">{totalCardsMainboard + totalCardsSideboard} ({totalCardsMainboard} + {totalCardsSideboard})</td>
                    </tr>
                    <tr>
                      <td>Source:</td>
                      <td className="text-right"><a href={this.props.stats.source[1]} target="_blank" rel="noopener noreferrer">{this.props.stats.source[0]}</a></td>
                    </tr>
                  </tbody>
                </Table>

                {/* <CMCPlot /> */}

                <Button variant="outline-dark" block>Download</Button>
                
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="text-muted">
            Tags: {tags}
          </Card.Footer>
        </Card>
      </div>
    );
  }

}

export default Deck;
