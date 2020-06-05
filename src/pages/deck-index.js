import React, { useMemo, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import decks from '../data/decks.json';
import { useTable, useSortBy } from 'react-table';
import DeckTable from '../components/DeckTable';

class DeckIndex extends React.Component {

  constructor(props) {
    super(props);
    this.decks = decks;
  }
  


  render() {
    function colorsHTML(colorList) {
      let colors;
      if (colorList) {
        colors = colorList.map((color, index) => 
          <i key={index} className={"ms ms-cost ms-" + color}></i>
        );
      } else {
        colors = '';
      }
      return colors;
    }

    return (
      <div className="DeckIndex">

        <Container>
          <h1 className="display-4 mt-5">Deck Index</h1>
          <div class="table-responsive">
            <DeckTable />
          </div>
        </Container>

      </div>
    );
  }
}

export default DeckIndex;
