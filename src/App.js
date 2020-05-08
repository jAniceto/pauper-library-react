import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroller';

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
      decks: this.decks.slice(0, 19), 
      hasMoreDecks: true
    }
  }

  loadItems(page) {
    const decksPerSet = 10;
    let currentDeckNumber = this.state.decks.length;
    let newDeckSet = this.decks.slice(currentDeckNumber, currentDeckNumber + decksPerSet);
    let decks = [...this.state.decks, ...newDeckSet];

    if ((currentDeckNumber + decksPerSet) >= this.decks.length) {
      this.setState({
        decks: decks,
        hasMoreDecks: false
      })
    } else {
      this.setState({
        decks: decks
      })
    }
  }

  render() {
    const loader = (
      <div className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );

    const deckCards = this.state.decks.map((deck, index) => 
      <Deck key={deck.name} stats={deck} />
    );

    return (
      <div className="App">
        <Header />

        <Container>
          {/* {deckCards} */}

          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadItems.bind(this)}
            hasMore={this.state.hasMoreDecks}
            loader={loader}
          >
            {deckCards}
          </InfiniteScroll>

        </Container>

        <Footer />
      </div>
    );
  }
}

export default App;
