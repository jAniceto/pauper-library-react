import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroller';
import './App.css';
import Deck from './components/Deck';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import Footer from './components/Footer';
import decks from './data/decks.json'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.decks = decks;
    this.decksPerSet = 10;
    this.state = {
      filteredDecks: this.decks,
      decks: this.decks.slice(0, this.decksPerSet - 1), 
      hasMoreDecks: true,
      selectedColors: [],
      filterOptionAllDecks: false,
    }
  }

  loadItems(page) {
    let currentDeckNumber = this.state.decks.length;
    let newDeckSet = this.state.filteredDecks.slice(currentDeckNumber, currentDeckNumber + this.decksPerSet);
    let decks = [...this.state.decks, ...newDeckSet];

    if ((currentDeckNumber + this.decksPerSet) >= this.state.filteredDecks.length) {
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

  decksToShow() {
    if (this.state.filterOptionAllDecks) {
      const filteredDecks = decks.filter(deck => this.state.selectedColors.every((val) => deck.color.includes(val)));
      this.setState({
        filteredDecks: filteredDecks,
        decks: filteredDecks.slice(0, this.decksPerSet - 1)
      })
    } else {    
      const filteredDecks = this.decks.filter(deck => deck.color.some((val) => this.state.selectedColors.indexOf(val) !== -1));
      this.setState({
        filteredDecks: filteredDecks,
        decks: filteredDecks.slice(0, this.decksPerSet - 1)
      });
    }
  }

  handleFilterSubmit(data) {
    this.setState({
      filterOptionAllDecks: data.allColors
    });
    
    let selectedColors = [];
    for (const [ key, value ] of Object.entries(data.colors)) {
      if (data.colors[key]) {
        selectedColors.push(key);
      }
    }
    if (selectedColors && selectedColors.length) {
      this.setState({
        selectedColors: selectedColors
      }, this.decksToShow);
    } else {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        selectedColors: []
      });
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
          <FilterSection handleFilterSubmit={(data) => this.handleFilterSubmit(data)} />

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
