import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import InfiniteScroll from 'react-infinite-scroller';

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { search } from '@fortawesome/free-solid-svg-icons'
// library.add(search)

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
      selectedFamily: "none",
      inputDeckName: ""
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

  filterDecksByName() {
    const nameList = this.state.inputDeckName.toLowerCase().split(" ");
    const filteredDecks = decks.filter(deck => nameList.every((val) => deck.name.toLowerCase().includes(val)));
    this.setState({
      filteredDecks: filteredDecks,
      decks: filteredDecks.slice(0, this.decksPerSet - 1)
    })
  }

  filterDecksByTag() {
    const tagList = this.state.inputTag.toLowerCase().split(" ");
    const filteredDecks = decks.filter(deck => tagList.every((val) => deck.tags.includes(val)));
    this.setState({
      filteredDecks: filteredDecks,
      decks: filteredDecks.slice(0, this.decksPerSet - 1)
    })
  }

  filterDecksByCard() {
    const cardName = this.state.inputCard.toLowerCase();
    const filteredDecks = decks.filter(deck => deck.mainboard.some(card => card.card_name.toLowerCase() === cardName));
    this.setState({
      filteredDecks: filteredDecks,
      decks: filteredDecks.slice(0, this.decksPerSet - 1)
    })
  }

  filterDecksByColor() {
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

  filterDecksByFamily() {
    const filteredDecks = this.decks.filter(deck => deck.family === this.state.selectedFamily);
    this.setState({
      filteredDecks: filteredDecks,
      decks: filteredDecks.slice(0, this.decksPerSet - 1)
    })
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
      }, this.filterDecksByColor);
    } else {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        selectedColors: []
      });
    }

    if (data.family != "none") {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        selectedFamily: data.family
      }, this.filterDecksByFamily);
    }

    if (data.deckName != "") {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        inputDeckName: data.deckName
      }, this.filterDecksByName);
    }

    if (data.tag != "") {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        inputTag: data.tag
      }, this.filterDecksByTag);
    }

    if (data.card != "") {
      this.setState({
        filteredDecks: this.decks,
        decks: this.decks.slice(0, this.decksPerSet - 1),
        inputCard: data.card
      }, this.filterDecksByCard);
    }
  }

  handleFilterReset(data) {
    this.setState({
      filterOptionAllDecks: data.allColors,
      filteredDecks: this.decks,
      decks: decks.slice(0, this.decksPerSet - 1),
      selectedColors: [],
      selectedFamily: "none"
    });
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
          <FilterSection 
            handleFilterSubmit={(data) => this.handleFilterSubmit(data)} 
            handleFilterReset={(data) => this.handleFilterReset(data)}
          />

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
