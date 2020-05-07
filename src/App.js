import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import './App.css';
import Deck from './components/Deck';
import Header from './components/Header';
import Footer from './components/Footer';
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

    // console.log(this.decks[0]);

    return (
      <div className="App">
        <Header />

        <Container>
          {deckCards}
        </Container>

        <Footer />
      </div>
    );
  }
}

export default App;
