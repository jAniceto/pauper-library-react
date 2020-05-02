import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import './App.css';
import Deck from './components/Deck';
import decks from './data/decks.json'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.decks = decks;
    this.state = {
      decks: this.decks
    }
  }

  render() {
    const deckCards = this.state.decks.map((deck, index) => 
      <Deck key={deck.name} stats={deck} />
    );

    return (
      <div className="App">
        <Container>
          {deckCards}
        </Container>
      </div>
    );
  }
}

export default App;
