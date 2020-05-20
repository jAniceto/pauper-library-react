import React from 'react';


export function getDeckFamilies() {
  return [
    'white',
    'blue',
    'black',
    'red',
    'green',
    'selesnya',
    'orzhov',
    'boros',
    'azorius',
    'dimir',
    'rakdos',
    'golgari',
    'izzet',
    'simic',
    'gruul',
    'naya',
    'esper',
    'grixis',
    'jund',
    'bant',
    'abzan',
    'temur',
    'jeskai',
    'mardu',
    'sultai',
    'glint',
    'dune',
    'ink',
    'whitch',
    'yore',
    'domain',
    'colorless'
  ];
}

export function getFamiliesSymbolsHTML(family) {
  const manaSynbols = {
    white: "{W}",
    blue: "{U}",
    black: "{B}",
    red: "{R}",
    green: "{G}",
    selesnya: "{W}{G}",
    orzhov: "{W}{B}",
    boros: "{W}{R}",
    azorius: "{W}{U}",
    dimir: "{U}{B}",
    rakdos: "{B}{R}",
    golgari: "{B}{G}",
    izzet: "{U}{R}",
    simic: "{U}{G}",
    gruul: "{R}{G}",
    naya: "{W}{R}{G}",
    esper: "{W}{U}{B}",
    grixis: "{U}{B}{R}",
    jund: "{B}{R}{G}",
    bant: "{W}{U}{G}",
    abzan: "{W}{B}{G}",
    temur: "{U}{R}{G}",
    jeskai: "{W}{U}{R}",
    mardu: "{W}{B}{R}",
    sultai: "{U}{B}{G}",
    glint: "{U}{B}{R}{G}",
    dune: "{W}{B}{R}{G}",
    ink: "{W}{U}{R}{G}",
    whitch: "{W}{U}{B}{G}",
    yore: "{W}{U}{B}{R}",
    domain: "{W}{U}{B}{R}{G}",
    colorless: "{C}",
  };

  return manaSynbols[family];
}
