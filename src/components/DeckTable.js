import React, { useMemo, useState, useEffect } from 'react';
import decks from '../data/decks.json';
import { useTable, useSortBy } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


export default function Table() {
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

  const deckList = decks.map((deck) => {
    let c = colorsHTML(deck.color);
    let t = deck.tags.map((tag, index) => <span key={index}><kbd>{tag}</kbd> </span>);
    return {
      name: deck.name,
      color: c,
      price: deck.price,  
      tag: t
    }
  })

  const data = React.useMemo(
    () => deckList,
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Deck name',
        accessor: 'name', // accessor is the "key" in the data
        sortType: 'basic',
        Cell: e => <Link to={`/deck/${e.value.toLowerCase()}`}>{e.value}</Link>
      },
      {
        Header: 'Colors',
        accessor: 'color',
        // sortType: 'basic',
        disableSortBy: true
      },{
        Header: 'Price (tix)',
        accessor: 'price',
        sortType: 'alphanumeric'
      },{
        Header: 'Tags',
        accessor: 'tag',
        disableSortBy: true
      }
    ],
    []
  ); 

  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
      columns,
      data
    },
    useSortBy
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  
  function name(params) {
    
  }

  return (
    <table className="table table-hover mt-3" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon={faSortDown} /> : <FontAwesomeIcon icon={faSortUp} />) : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                {/* <td {...row.cells[0].getCellProps()}>
                  <Link to={row.cells[0].toLowerCase().replace(" ", "-")}>{row.cells[0].render('Cell')}</Link>
                </td>
                <td {...row.cells[1].getCellProps()}>{row.cells[1].render('Cell')}</td>
                <td {...row.cells[2].getCellProps()}>{row.cells[2].render('Cell')}</td>
                <td {...row.cells[3].getCellProps()}>{row.cells[3].render('Cell')}</td> */}
              </tr>
            )}
        )}
      </tbody>
    </table>
  );
}