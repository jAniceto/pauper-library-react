import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Deck from '../components/Deck';
import decks from '../data/decks.json'; 
import { useParams } from 'react-router-dom';


function DeckPage(props) {
  function getDeckFromName(deckName) {
    const nameString = deckName.toLowerCase();
    console.log(decks.filter(deck => deck.name.toLowerCase() === nameString))
    // return decks.filter(deck => nameString.every((val) => deck.name.toLowerCase().includes(val)))[0];
    return decks.filter(deck => deck.name.toLowerCase() === nameString)[0];
  }

  let { deckName } = useParams();
  const deck = getDeckFromName(deckName);

  return (
    <Container>
      <Deck 
        key={deck.name} 
        stats={deck} 
      />
      </Container>
  );
}

export default DeckPage;
