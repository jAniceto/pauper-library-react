import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {getRandomInt} from '../utils/random.js';
import Deck from '../components/Deck';
import decks from '../data/decks.json';


class RandomDeckPage extends React.Component {

  constructor(props) {
    super(props);
    this.decks = decks;
    this.state = {
      deck: this.decks[0]
    }
    
    this.getRandomDeck = this.getRandomDeck.bind(this);
    this.handleRandomButton = this.handleRandomButton.bind(this);
  }

  getRandomDeck() {
    const deckNumber = this.decks.length;
    let randomIndex = getRandomInt(deckNumber);
    this.setState({
      deck: this.decks[randomIndex]
    })
  }

  componentDidMount() {
    this.getRandomDeck();
  }

  handleRandomButton(event) {
    this.getRandomDeck();
  }

  render() {
    // Random button
    const randomizeButton = (
      <Button className="mt-4" variant="dark" size="lg" block onClick={this.handleRandomButton}>Get random deck!</Button>
    );
    
    return (
      <Container>
        <h1 className="display-4 mt-5">What to play next?</h1>
        {randomizeButton}
        <Deck 
          key={this.state.deck.name} 
          stats={this.state.deck} 
        />
      </Container>
    );
  }
}

export default RandomDeckPage;
