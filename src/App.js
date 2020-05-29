import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
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
      inputDeckName: "",
      inputTag: "",
      inputCard: "",
      selectedFamily: "none",
      selectedColors: [],
      filterOptionAllDecks: false,
      showCardImageModal: false,
      cardImage: ""
    }

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleCardModalClose = this.handleCardModalClose.bind(this);
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

  filterDecks() {
    // Run all filters sequentially
    let filteredDecks = decks;

    // Filter by deck name
    if (this.state.inputDeckName != "") {
      const nameList = this.state.inputDeckName.toLowerCase().split(" ");
      filteredDecks = filteredDecks.filter(deck => nameList.every((val) => deck.name.toLowerCase().includes(val)));
    }

    // Filter by tag
    if (this.state.inputTag != "") {
      const tagList = this.state.inputTag.toLowerCase().split(" ");
      filteredDecks = filteredDecks.filter(deck => tagList.every((val) => deck.tags.includes(val)));
    }

    // Filter by card
    if (this.state.inputCard != "") {
      const cardName = this.state.inputCard.toLowerCase();
      filteredDecks = filteredDecks.filter(deck => deck.mainboard.some(card => card.card_name.toLowerCase() === cardName));
    }
    
    // Filter by family
    if (this.state.selectedFamily != "none") {
      filteredDecks = filteredDecks.filter(deck => deck.family === this.state.selectedFamily);
    }

    // Filter by colors
    if (this.state.selectedColors && this.state.selectedColors.length) {
      if (this.state.filterOptionAllDecks) {
        filteredDecks = filteredDecks.filter(deck => this.state.selectedColors.every((val) => deck.color.includes(val)));
      } else {    
        filteredDecks = filteredDecks.filter(deck => deck.color.some((val) => this.state.selectedColors.indexOf(val) !== -1));
      }
    }

    this.setState({
      filteredDecks: filteredDecks,
      decks: filteredDecks.slice(0, this.decksPerSet - 1)
    })
  }

  handleFilterSubmit(data) {
    // Create a list of color codes from the colors dict
    let selectedColors = [];
    for (const [ key, value ] of Object.entries(data.colors)) {
      if (data.colors[key]) {
        selectedColors.push(key);
      }
    }
    // Update state and run filters
    this.setState({
      filterOptionAllDecks: data.allColors,
      selectedColors: selectedColors,
      selectedFamily: data.family,
      inputDeckName: data.deckName,
      inputTag: data.tag,
      inputCard: data.card
    }, this.filterDecks);
  }

  handleFilterReset(data) {
    // Reset all filters (reset state)
    this.setState({
      filterOptionAllDecks: data.allColors,
      filteredDecks: this.decks,
      decks: decks.slice(0, this.decksPerSet - 1),
      inputDeckName: "",
      inputTag: "",
      inputCard: "",
      selectedFamily: "none",
      selectedColors: [],
      filterOptionAllDecks: false,
    });
  }

  handleCardClick(data) {
    // If on small screen, show modal
    if (window.innerWidth < 768) {
      this.setState({
        showCardImageModal: !this.state.showCardImageModal ,
        cardImage: data['image_uris']['normal']
      });
    }
  }

  handleCardModalClose() {
    // Function to turn off modal
    this.setState({
      showCardImageModal: false
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
      <Deck 
        key={deck.name} 
        stats={deck} 
        handleCardClick={this.handleCardClick}
      />
    );

    return (
      <div className="App">
        <Header />

        <Modal
          className="d-md-none"
          show={this.state.showCardImageModal}
          onHide={this.handleCardModalClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
          <img 
            className="img-fluid" 
            height="310" 
            src={this.state.cardImage} 
            alt="Card image"
          />
          </Modal.Body>
        </Modal>


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
